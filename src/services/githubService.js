const BASE_URL = 'https://api.github.com';
const CONTRIBUTIONS_API = 'https://github-contributions-api.deno.dev';

import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = API_KEY && API_KEY !== 'YOUR_GEMINI_API_KEY_HERE' ? new GoogleGenerativeAI(API_KEY) : null;

async function githubFetch(endpoint, options = {}) {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
        ...(options.headers || {}),
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        if (response.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
        }
        if (response.status === 404) {
            throw new Error('User not found');
        }
        throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function fetchContributionData(username) {
    try {
        const response = await fetch(`${CONTRIBUTIONS_API}/${username}.json`);
        if (!response.ok) throw new Error('Failed to fetch contribution data');
        const data = await response.json();
        
        // Flatten all weeks into a single array of days
        const days = data.contributions.flat();
        
        return {
            totalContributions: data.totalContributions,
            days: days
        };
    } catch (e) {
        console.error('Contribution API error:', e);
        return null;
    }
}

function calculateStreaksFromDays(days) {
    if (!days || days.length === 0) return { currentStreak: 0, longestStreak: 0 };

    const sortedDays = [...days].sort((a, b) => new Date(b.date) - new Date(a.date));
    const contributingDays = sortedDays.filter(day => day.contributionCount > 0);
    if (contributingDays.length === 0) return { currentStreak: 0, longestStreak: 0 };

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let currentStreak = 0;
    if (contributingDays[0].date === today || contributingDays[0].date === yesterday) {
        currentStreak = 1;
        for (let i = 0; i < contributingDays.length - 1; i++) {
            const curr = new Date(contributingDays[i].date);
            const next = new Date(contributingDays[i + 1].date);
            const diff = (curr - next) / (1000 * 60 * 60 * 24);
            if (diff <= 1) currentStreak++;
            else break;
        }
    }

    let longestStreak = 0;
    let tempStreak = 1;
    for (let i = 0; i < contributingDays.length - 1; i++) {
        const curr = new Date(contributingDays[i].date);
        const next = new Date(contributingDays[i + 1].date);
        const diff = (curr - next) / (1000 * 60 * 60 * 24);
        if (diff <= 1) {
            tempStreak++;
        } else {
            longestStreak = Math.max(longestStreak, tempStreak);
            tempStreak = 1;
        }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    return { currentStreak, longestStreak };
}

async function fetchAllRepos(username) {
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 5) {
        const repos = await githubFetch(`/users/${username}/repos?per_page=100&page=${page}&sort=updated`);
        if (repos.length === 0) {
            hasMore = false;
        } else {
            allRepos = [...allRepos, ...repos];
            if (repos.length < 100) hasMore = false;
            else page++;
        }
    }
    return allRepos;
}

async function generatePersona(languages, repos) {
    if (!languages || languages.length === 0) return { title: 'New Explorer', bio: 'Just starting their GitHub journey.' };

    const fallback = () => {
        const topLang = languages[0][0];
        const secondaryLang = languages[1]?.[0];
        
        const allTopics = repos.flatMap(r => r.topics || []);
        const isWeb = allTopics.some(t => ['web', 'react', 'vue', 'nextjs', 'frontend', 'html', 'css'].includes(t.toLowerCase())) || ['JavaScript', 'TypeScript', 'HTML', 'CSS'].includes(topLang);
        const isBackend = allTopics.some(t => ['backend', 'api', 'server', 'database', 'node', 'go', 'rust'].includes(t.toLowerCase())) || ['Go', 'Rust', 'Java', 'Python', 'PHP'].includes(topLang);
        const isData = allTopics.some(t => ['data', 'ml', 'ai', 'research', 'analysis', 'python'].includes(t.toLowerCase())) || (topLang === 'Python' && !isWeb);
        const isMobile = allTopics.some(t => ['ios', 'android', 'mobile', 'flutter', 'react-native'].includes(t.toLowerCase())) || ['Swift', 'Kotlin', 'Dart'].includes(topLang);

        let title = 'Software Explorer';
        let bio = `A passionate developer focusing on ${topLang}${secondaryLang ? ` and ${secondaryLang}` : ''}.`;

        if (isWeb && isBackend) {
            title = 'Full-Stack Architect';
            bio = 'Expertly bridging the gap between elegant frontends and robust scalable backends.';
        } else if (isWeb) {
            title = 'Frontend Visionary';
            bio = 'Creating immersive and highly responsive web experiences with modern frameworks.';
        } else if (isBackend) {
            title = 'Systems Engineer';
            bio = 'Building the backbone of modern applications with a focus on performance and reliability.';
        } else if (isData) {
            title = 'Intelligence Specialist';
            bio = 'Turning complex data into actionable insights and building the future of AI.';
        } else if (isMobile) {
            title = 'Mobile Innovator';
            bio = 'Crafting seamless experiences for users on the go, from iOS to Android.';
        }

        return { title, bio };
    };

    if (!genAI) return fallback();

    try {
        const modelNames = ["gemini-flash-latest", "gemini-3-flash-preview", "gemini-2.0-flash", "gemini-1.5-flash"];
        let result = null;
        let lastError = null;

        const topLangs = languages.map(([lang]) => lang).join(', ');
        const repoTopics = repos.flatMap(r => r.topics || []).slice(0, 15).join(', ');
        
        const prompt = `
            You are an expert tech talent analyst who values simplicity and clarity.
            Given a GitHub user with top languages: ${topLangs} 
            And repository topics: ${repoTopics}
            
            Create a unique developer persona title and a one-sentence bio.
            - AVOID buzzwords like "orchestrating", "convergence", "resilient", "high-fidelity", "synthesis".
            - Use simple, human language that a recruiter or another developer would appreciate.
            - Focus on the practical impact of their work.
            
            Format the response as a JSON object with these keys:
            - title: A short, simple title (e.g., 'Modern Web Developer', 'Backend API Builder', 'Python Automation Expert')
            - bio: A single, clear sentence describing what they build and why it matters.
            
            Return ONLY the raw JSON object. No markdown, no explanations.
        `;

        for (const modelName of modelNames) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                result = await model.generateContent(prompt);
                if (result) break;
            } catch (e) {
                lastError = e;
            }
        }

        if (!result) throw lastError || new Error("Persona generation failed");

        const text = result.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        const cleanedText = jsonMatch ? jsonMatch[0] : text;
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error('Gemini AI Persona error:', error);
        return fallback();
    }
}

async function generateRecommendations(languages, repos) {
    if (!languages || languages.length === 0) return [];

    const fallback = () => {
        const recommendations = {
            'JavaScript': {
                next: 'Next.js 14 & Server Components',
                reason: 'You have a strong JS foundation. Mastering SSR and Server Components will make you a top-tier modern web architect.',
                links: ['https://nextjs.org/docs']
            },
            'TypeScript': {
                next: 'Advanced Type-Safe API Design (tRPC)',
                reason: 'You already use types. Moving to full-stack type safety with tRPC will drastically speed up your development cycles.',
                links: ['https://trpc.io/docs']
            },
            'Python': {
                next: 'Rust for High-Performance Python',
                reason: 'For a Pythonista, learning Rust to write performance-critical modules (via PyO3) is a modern superpower.',
                links: ['https://pyo3.rs/']
            },
            'Go': {
                next: 'Cloud-Native Architecture (Kubernetes Operators)',
                reason: 'Go is the language of the cloud. Building custom K8s operators is the peak of Go cloud engineering.',
                links: ['https://sdk.operatorframework.io/']
            },
            'Java': {
                next: 'Native Compilation with GraalVM',
                reason: 'Mastering native images will allow you to build lightning-fast, resource-efficient microservices in Java.',
                links: ['https://www.graalvm.org/']
            },
            'Rust': {
                next: 'WebAssembly (Wasm) Systems',
                reason: 'Since you know Rust, bringing that performance to the browser via Wasm is a natural and powerful next step.',
                links: ['https://webassembly.org/']
            }
        };

        const result = [];
        languages.slice(0, 2).forEach(([lang]) => {
            if (recommendations[lang]) {
                result.push({ language: lang, ...recommendations[lang] });
            }
        });

        if (result.length === 0) {
            result.push({
                language: languages[0][0],
                next: 'Open Source Contribution',
                reason: 'The best way to level up in any language is by contributing to major projects in that ecosystem.',
                links: ['https://github.com/explore']
            });
        }
        return result;
    };

    if (!genAI) return fallback();

    try {
        const modelNames = [
            "gemini-flash-latest", 
            "gemini-3-flash-preview",
            "gemini-2.0-flash",
            "gemini-1.5-flash", 
            "gemini-1.5-flash-latest", 
            "gemini-1.5-pro"
        ];
        let result = null;
        let lastError = null;

        const topLangs = languages.map(([lang]) => lang).join(', ');
        const repoTopics = repos.flatMap(r => r.topics || []).slice(0, 10).join(', ');
        const prompt = `
            You are an expert developer career coach.
            Given a GitHub user with top languages: ${topLangs} 
            And repository topics: ${repoTopics}
            
            Suggest 2-3 specific learning paths or next steps for them.
            Format the response as a JSON array of objects with these keys:
            - language: the language this suggestion is based on
            - next: a concise title of what to learn next (max 5 words)
            - reason: a brief explanation of why this is a good next step (max 20 words)
            - links: an array of 1-2 relevant documentation or learning URLs
            
            Return ONLY the raw JSON array. No markdown, no explanations.
        `;

        for (const modelName of modelNames) {
            try {
                const model = genAI.getGenerativeModel({ model: modelName });
                result = await model.generateContent(prompt);
                if (result) break;
            } catch (e) {
                console.warn(`Failed to use model ${modelName}:`, e);
                lastError = e;
            }
        }

        if (!result) throw lastError || new Error("All AI models failed");

        const text = result.response.text();
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        const cleanedText = jsonMatch ? jsonMatch[0] : text;
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error('Gemini AI error:', error);
        return fallback();
    }
}

function calculateRepoImpact(repo) {
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const watchers = repo.watchers_count || 0;
    const issues = repo.open_issues_count || 0;
    
    // Impact score logic: Stars and Forks are weighted heavily
    const score = (stars * 10) + (forks * 25) + (watchers * 2);
    
    if (score === 0) return { score: 0, insight: 'Personal Project' };

    let insight = 'Growing Project';
    if (score > 2000) insight = 'High Impact';
    else if (stars > 500) insight = 'Popular';
    else if (forks > 100) insight = 'Community Driven';
    else if (issues < 5 && stars > 20) insight = 'Highly Maintained';
    else if (repo.description?.length > 150) insight = 'Well Documented';
    else if (new Date(repo.updated_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) insight = 'Actively Updated';
    else if (repo.homepage) insight = 'Live Project';

    return { score, insight };
}

export const githubService = {
    async fetchFullUserData(username) {
        const [user, repos, contribData] = await Promise.all([
            githubFetch(`/users/${username}`),
            fetchAllRepos(username),
            fetchContributionData(username),
        ]);

        // Process repos with impact analysis
        const processedRepos = repos.map(repo => ({
            ...repo,
            impact: calculateRepoImpact(repo)
        }));

        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);
        
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        const sortedLanguages = Object.entries(languages)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        const [persona, recommendations] = await Promise.all([
            generatePersona(sortedLanguages, repos),
            generateRecommendations(sortedLanguages, repos)
        ]);

        let stats = {
            totalStars,
            totalForks,
            totalRepos: user.public_repos,
            languages: sortedLanguages,
            persona,
            recommendations
        };

        if (contribData) {
            const streaks = calculateStreaksFromDays(contribData.days);
            stats = {
                ...stats,
                totalContributions: contribData.totalContributions,
                currentStreak: streaks.currentStreak,
                longestStreak: streaks.longestStreak,
            };
        } else {
            stats = {
                ...stats,
                totalContributions: '---',
                currentStreak: 0,
                longestStreak: 0,
            };
        }

        return {
            user,
            repos: processedRepos.slice(0, 6),
            stats
        };
    }
};
