import React, { useState, useRef } from 'react';
import { Search, Github, ArrowRight, Activity } from 'lucide-react';
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
                backgroundColor: '#FFFFFF',
                scale: 2,
                logging: false,
                useCORS: true,
                allowTaint: true,
                borderRadius: 16
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
        <div className="min-h-screen flex flex-col bg-google-bg text-google-textPrimary selection:bg-google-blueLight selection:text-google-blue font-sans">
            {/* Header / Navbar style */}
            <header className="w-full bg-white border-b border-google-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <Github className="text-google-textPrimary" size={24} />
                    <span className="font-display font-medium text-xl tracking-tight text-google-textSecondary">
                        Git<span className="text-google-blue font-semibold">folio</span>
                    </span>
                </div>
            </header>

            <main className="flex-grow w-full relative z-10">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 pb-32">
                    
                    {!userData && !loading && (
                        <div className="text-center mb-16 animate-fade-in max-w-2xl mx-auto mt-10">
                            <h1 className="text-4xl sm:text-5xl font-normal tracking-tight font-display text-google-textPrimary mb-4">
                                Analyze your <span className="text-google-blue font-medium">GitHub</span> impact
                            </h1>
                            <p className="text-google-textSecondary text-lg font-normal mb-10">
                                Enter a GitHub username to generate a beautifully crafted, AI-powered profile summary with deep insights.
                            </p>
                        </div>
                    )}

                    <div className={`transition-all duration-500 ease-in-out ${userData || loading ? 'mb-10' : ''}`}>
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="material-search flex items-center px-4 py-3 bg-white w-full">
                                <Search className="text-google-textSecondary ml-2 mr-3 flex-shrink-0" size={20} />
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Search GitHub users (e.g. mohd-irtiza20)"
                                    className="w-full bg-transparent border-none outline-none text-google-textPrimary placeholder-google-textSecondary text-base font-normal h-8"
                                />
                                {username && (
                                    <button 
                                        type="button" 
                                        onClick={() => setUsername('')}
                                        className="p-1 hover:bg-google-surfaceHover rounded-full text-google-textSecondary transition-colors mr-2"
                                    >
                                        <svg xmlns="http://www.w3.org/.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    disabled={loading || !username.trim()}
                                    className="px-6 py-2 bg-google-blue hover:bg-google-blueHover text-white rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-google-blue flex items-center gap-2 font-medium text-sm ml-2"
                                >
                                    {loading ? (
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        'Explore'
                                    )}
                                </button>
                            </div>
                        </form>

                        {error && (
                            <div className="mt-6 flex justify-center animate-fade-in">
                                <div className="px-4 py-2 bg-google-redLight text-google-red rounded-lg font-medium text-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
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
                            
                            <div className="animate-slide-up opacity-0" style={{ animationDelay: '100ms' }}>
                                <StatsGrid stats={stats} />
                            </div>

                            <div className="grid lg:grid-cols-3 gap-6 items-start">
                                <div className="lg:col-span-1 space-y-6 animate-slide-up opacity-0" style={{ animationDelay: '150ms' }}>
                                    <LanguageStats languages={stats.languages} />
                                    <RecommendationsCard recommendations={stats.recommendations} />
                                </div>
                                <div className="lg:col-span-2 material-card p-6 sm:p-8 animate-slide-up opacity-0" style={{ animationDelay: '200ms' }}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-normal text-google-textPrimary font-display flex items-center gap-2">
                                            <Activity className="text-google-blue" size={20} />
                                            Top Repositories
                                        </h3>
                                        <a 
                                            href={`https://github.com/${userData.login}?tab=repositories`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-google-blue hover:text-google-blueHover font-medium text-sm flex items-center gap-1 transition-colors px-3 py-1.5 hover:bg-google-blueLight rounded-full"
                                        >
                                            View all
                                            <ArrowRight size={14} />
                                        </a>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {repos.map((repo, i) => (
                                            <div key={repo.id}>
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

            <footer className="w-full border-t border-google-border bg-white py-6 mt-auto">
                <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-google-textSecondary text-sm gap-4">
                    <div className="flex items-center gap-2">
                        <Github size={16} />
                        <span className="font-display font-medium">Gitfolio</span>
                    </div>
                    <div className="flex gap-6 font-medium">
                        <a href="https://github.com/mohd-irtiza20" target="_blank" rel="noopener noreferrer" className="hover:text-google-blue transition-colors">GitHub</a>
                        <a href="https://mohdirtiza.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-google-blue transition-colors">Portfolio</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}