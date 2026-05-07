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
        <div className="min-h-screen flex flex-col bg-[#0d1117] text-[#c9d1d9] selection:bg-blue-500/30 selection:text-white font-sans noise-bg">
            {/* Animated background orbs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/[0.07] rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-600/[0.07] rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-emerald-600/[0.04] rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <main className="flex-grow w-full relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pb-64">
                    {/* Hero Section */}
                    <div className="text-center mb-20 animate-fade-in">
                        <div className="flex flex-col items-center justify-center gap-6 mb-10">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                <div className="relative p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-2xl animate-glow">
                                    <div className="bg-[#0d1117] p-4 rounded-full">
                                        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight font-display">
                                <span className="text-white">Git</span><span className="gradient-text">folio</span>
                            </h1>
                            <p className="text-[#8b949e] text-lg sm:text-xl font-medium max-w-lg mx-auto leading-relaxed">
                                AI-powered analytics dashboard for your GitHub presence.
                            </p>
                        </div>

                        <form onSubmit={handleSearch} className="max-w-xl mx-auto px-4 relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Username (e.g. torvalds)"
                                    className="w-full pl-6 pr-32 py-4 bg-[#161b22]/90 backdrop-blur-sm border border-[#30363d] rounded-full text-white placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff]/50 focus:ring-2 focus:ring-[#58a6ff]/20 transition-all font-medium text-lg shadow-lg"
                                />
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#3fb950] text-white rounded-full transition-all disabled:opacity-50 flex items-center gap-2 font-bold shadow-lg hover:shadow-green-500/20 active:scale-95"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
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
                            <div className="mt-8 flex justify-center animate-shake">
                                <div className="px-6 py-3 bg-red-900/20 border border-red-500/50 rounded-full text-[#ff7b72] font-semibold flex items-center gap-2 backdrop-blur-sm">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                    {error}
                                </div>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <LoadingSkeleton />
                    ) : userData ? (
                        <div className="space-y-8">
                            <div className="animate-slide-up opacity-0">
                                <ProfileHeader 
                                    userData={userData} 
                                    persona={stats?.persona}
                                    onShare={shareCard} 
                                    onSave={downloadCard} 
                                    cardRef={cardRef}
                                />
                            </div>
                            
                            <div className="animate-slide-up-delay-1 opacity-0">
                                <StatsGrid stats={stats} />
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8 items-start">
                                <div className="lg:col-span-1 space-y-8 animate-slide-up-delay-2 opacity-0">
                                    <LanguageStats languages={stats.languages} />
                                    <RecommendationsCard recommendations={stats.recommendations} />
                                </div>
                                <div className="lg:col-span-2 space-y-6 animate-slide-up-delay-3 opacity-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold flex items-center gap-2 text-white font-display">
                                            <Zap className="text-[#a5d6ff]" size={20} />
                                            Top Repositories
                                        </h3>
                                        <a 
                                            href={`https://github.com/${userData.login}?tab=repositories`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#58a6ff] hover:text-white font-semibold text-sm flex items-center gap-1 transition-colors group"
                                        >
                                            View all
                                            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                        </a>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {repos.map((repo, i) => (
                                            <div key={repo.id} className={`stagger-${i + 1} animate-scale-in opacity-0`}>
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

            <div className="w-full bg-[#0d1117] py-16 border-t border-[#30363d]/50 relative z-10">
                <footer className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-[#8b949e] text-sm gap-8 text-center md:text-left">
                    <div className="flex flex-col gap-2">
                        <p className="font-bold text-2xl tracking-tight font-display">
                            <span className="text-white">Git</span><span className="gradient-text">folio</span>
                        </p>
                        <p className="text-xs opacity-70">
                            © {new Date().getFullYear()} • Handcrafted by <span className="text-[#58a6ff] font-bold">Mohd Irtiza</span>
                        </p>
                    </div>
                    <div className="flex gap-10 font-bold uppercase tracking-[0.2em] text-[10px]">
                        <a 
                            href="https://www.linkedin.com/in/mohdirtiza20/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#58a6ff] transition-all duration-300 hover:scale-110"
                        >
                            LinkedIn
                        </a>
                        <a 
                            href="https://github.com/mohd-irtiza20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#58a6ff] transition-all duration-300 hover:scale-110"
                        >
                            GitHub
                        </a>
                        <a 
                            href="https://mohdirtiza.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#58a6ff] transition-all duration-300 hover:scale-110"
                        >
                            Portfolio
                        </a>
                    </div>
                </footer>
            </div>
        </div>
    );
}