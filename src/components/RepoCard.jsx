import React from 'react';
import { BookOpen, Star, GitFork, Sparkles } from 'lucide-react';

const getLanguageColor = (lang) => {
    const colors = {
        JavaScript: '#f1e05a',
        TypeScript: '#3178c6',
        Python: '#3572A5',
        Java: '#b07219',
        Go: '#00ADD8',
        Rust: '#dea584',
        Ruby: '#701516',
        PHP: '#4F5D95',
        CSS: '#563d7c',
        HTML: '#e34c26',
        'C++': '#f34b7d',
        C: '#555555',
        'C#': '#178600',
        Swift: '#ffac45',
        Kotlin: '#A97BFF'
    };
    return colors[lang] || '#8b949e';
};

const getInsightStyles = (insight) => {
    switch (insight) {
        case 'High Impact':
            return 'bg-purple-500/10 text-purple-400';
        case 'Popular':
            return 'bg-yellow-500/10 text-yellow-400';
        case 'Growing Project':
            return 'bg-emerald-500/10 text-emerald-400';
        case 'Actively Updated':
            return 'bg-sky-500/10 text-sky-400';
        case 'Live Project':
            return 'bg-cyan-500/10 text-cyan-400';
        case 'Highly Maintained':
            return 'bg-indigo-500/10 text-indigo-400';
        case 'Well Documented':
            return 'bg-gray-700/50 text-gray-400';
        case 'Community Driven':
            return 'bg-pink-500/10 text-pink-400';
        default:
            return 'bg-brand/10 text-brand';
    }
};

export const RepoCard = ({ repo }) => {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="interactive-card p-5 group flex flex-col h-full"
        >
            <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <BookOpen className="text-gray-400 flex-shrink-0" size={16} />
                        <h4 className="font-bold text-brand group-hover:underline text-base truncate font-display">
                            {repo.name}
                        </h4>
                    </div>
                    <div className="px-1.5 py-0.5 border border-gray-600 rounded text-[10px] text-gray-400 font-semibold uppercase tracking-wide flex-shrink-0 bg-gray-800">
                        {repo.private ? 'Private' : 'Public'}
                    </div>
                </div>

                {repo.impact && repo.impact.score > 0 && (
                    <div className={`flex items-center gap-1.5 w-fit px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getInsightStyles(repo.impact.insight)}`}>
                        <Sparkles size={10} className="opacity-80" />
                        {repo.impact.insight}
                    </div>
                )}
            </div>
            
            {repo.description ? (
                <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {repo.description}
                </p>
            ) : <div className="flex-grow"></div>}
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
                <div className="flex items-center gap-4 text-[12px] text-gray-400 font-medium">
                    {repo.language && (
                        <span className="flex items-center gap-1.5">
                            <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                            ></span>
                            <span>{repo.language}</span>
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <Star size={14} className="text-gray-500" />
                        {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                        <GitFork size={14} className="text-gray-500" />
                        {repo.forks_count}
                    </span>
                </div>
            </div>
        </a>
    );
};
