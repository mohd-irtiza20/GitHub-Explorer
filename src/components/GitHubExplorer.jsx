import React, { useState, useRef } from 'react';
import { Search, Zap, Github, ArrowRight } from 'lucide-react';
import { githubService } from '../services/githubService';
import { ProfileHeader } from './ProfileHeader';
import { StatsGrid } from './StatsGrid';
import { RepoCard } from './RepoCard';
import { LanguageStats } from './LanguageStats';
import { RecommendationsCard } from './RecommendationsCard';
import { LoadingSkeleton } from './LoadingSkeleton';

export default function GitHubExplorer() {
    const [username, setUsername] = useState('');
    const [userData, setUserData] = useState(null);
    const [repos, setRepos] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const cardRef = useRef(null);

    const fetchUserData = async (author) => {
        if (!author.trim()) {
            setError('Please enter a username');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const data = await githubService.fetchFullUserData(author);
            setUserData(data.user);
            setRepos(data.repos);
            setStats(data.stats);
        } catch (err) {
            console.error('Fetch error:', err);
            setError(err.message || 'Failed to fetch data. Please try again.');
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchUserData(username);
    };

    const downloadCard = async () => {
        if (!cardRef.current || !userData) return;

        try {
            const html2canvas = (await import('https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/+esm')).default;
            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: '#0d1117',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                borderRadius: 12
            });

            const link = document.createElement('a');
            link.download = `${userData.login}-github-profile.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (err) {
            console.error('Download error:', err);
            alert('Failed to download card. Please try again.');
        }
    };

    const shareCard = async () => {
        if (!userData) return;
        const shareData = {
            title: `${userData.name || userData.login}'s GitHub Profile`,
            text: `Check out ${userData.name || userData.login} on GitHub!`,
            url: userData.html_url
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                copyToClipboard(userData.html_url);
            }
        } else {
            copyToClipboard(userData.html_url);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Profile link copied to clipboard!');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 text-gray-300 selection:bg-brand-hover/30 selection:text-white font-sans">
            <main className="flex-grow w-full relative z-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pb-32">
                    {/* Hero Section */}
                    <div className="text-center mb-16 animate-fade-in">
                        <div className="flex flex-col items-center justify-center gap-5 mb-8">
                            <div className="p-3 bg-gray-800 border border-gray-600 rounded-2xl shadow-sm">
                                <Github className="w-10 h-10 text-white" />
                            </div>
                            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight font-display text-white">
                                Gitfolio
                            </h1>
                            <p className="text-gray-400 text-lg font-medium max-w-lg mx-auto leading-relaxed">
                                AI-powered analytics dashboard for your GitHub presence.
                            </p>
                        </div>

                        <form onSubmit={handleSearch} className="max-w-xl mx-auto px-4">
                            <div className="relative flex items-center shadow-lg group">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username (e.g. torvalds)"
                                    className="w-full pl-6 pr-32 py-4 bg-gray-800 border border-gray-600 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all font-medium text-lg"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="absolute right-2 px-6 py-2.5 bg-brand hover:bg-brand-hover text-gray-900 rounded-full transition-colors disabled:opacity-50 flex items-center gap-2 font-bold active:scale-95"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-gray-900/30 border-t-gray-900 rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <Search size={18} />
                                            <span>Explore</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="mt-8 flex justify-center">
                                <div className="px-5 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 font-medium text-sm flex items-center gap-2">
                                    {error}
                                </div>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <LoadingSkeleton />
                    ) : userData ? (
                        <div className="space-y-6">
                            <div className="animate-slide-up">
                                <ProfileHeader 
                                    userData={userData} 
                                    persona={stats?.persona}
                                    onShare={shareCard} 
                                    onSave={downloadCard} 
                                    cardRef={cardRef}
                                />
                            </div>
                            
                            <div className="animate-slide-up delay-100 opacity-0">
                                <StatsGrid stats={stats} />
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6 items-start">
                                <div className="lg:col-span-1 space-y-6 animate-slide-up delay-150 opacity-0">
                                    <LanguageStats languages={stats.languages} />
                                    <RecommendationsCard recommendations={stats.recommendations} />
                                </div>
                                <div className="lg:col-span-2 space-y-4 animate-slide-up delay-200 opacity-0">
                                    <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                                        <h3 className="text-lg font-bold flex items-center gap-2 text-white font-display">
                                            <Zap className="text-brand" size={18} />
                                            Top Repositories
                                        </h3>
                                        <a 
                                            href={`https://github.com/${userData.login}?tab=repositories`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-brand hover:text-brand-hover font-medium text-sm flex items-center gap-1 transition-colors group"
                                        >
                                            View all
                                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                        </a>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {repos.map((repo, i) => (
                                            <div key={repo.id} className={`animate-slide-up opacity-0`} style={{ animationDelay: \`\${200 + (i * 50)}ms\` }}>
                                                <RepoCard repo={repo} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </main>

            <footer className="w-full bg-gray-900 py-10 border-t border-gray-800 relative z-10">
                <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm gap-6 text-center md:text-left">
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-xl tracking-tight font-display text-gray-300">
                            Gitfolio
                        </p>
                        <p className="text-xs">
                            © {new Date().getFullYear()} • Built by <span className="text-gray-300 font-medium">Mohd Irtiza</span>
                        </p>
                    </div>
                    <div className="flex gap-8 font-semibold text-xs tracking-wider">
                        <a href="https://www.linkedin.com/in/mohdirtiza20/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                        <a href="https://github.com/mohd-irtiza20" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                        <a href="https://mohdirtiza.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Portfolio</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}