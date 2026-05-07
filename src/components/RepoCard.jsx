import React from 'react';
import { BookOpen, Star, GitFork, Sparkles } from 'lucide-react';

const getLanguageColor = (lang) => {
    const colors = {
        JavaScript: '#F9AB00', // yellow
        TypeScript: '#1A73E8', // blue
        Python: '#1A73E8',
        Java: '#D93025', // red
        Go: '#1A73E8',
        Rust: '#E37400', // orange
        Ruby: '#D93025',
        PHP: '#5F6368', // gray
        CSS: '#1E8E3E', // green
        HTML: '#E37400',
        'C++': '#1A73E8',
        C: '#5F6368',
        'C#': '#1E8E3E',
        Swift: '#E37400',
        Kotlin: '#A142F4' // purple
    };
    return colors[lang] || '#5F6368';
};

const getInsightStyles = (insight) => {
    switch (insight) {
        case 'High Impact':
            return 'bg-[#FCE8E6] text-[#D93025]'; // red light
        case 'Popular':
            return 'bg-[#FEF7E0] text-[#E37400]'; // yellow light
        case 'Growing Project':
            return 'bg-[#E6F4EA] text-[#1E8E3E]'; // green light
        case 'Actively Updated':
            return 'bg-[#E8F0FE] text-[#1A73E8]'; // blue light
        case 'Live Project':
            return 'bg-[#E8F0FE] text-[#1A73E8]';
        case 'Highly Maintained':
            return 'bg-[#F3E8FD] text-[#A142F4]'; // purple light
        case 'Well Documented':
            return 'bg-[#F1F3F4] text-[#5F6368]'; // gray light
        case 'Community Driven':
            return 'bg-[#FCE8E6] text-[#D93025]';
        default:
            return 'bg-[#E8F0FE] text-[#1A73E8]';
    }
};

export const RepoCard = ({ repo }) => {
    return (
        <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="material-card-hoverable p-5 group flex flex-col h-full"
        >
            <div className="flex flex-col gap-3 mb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <BookOpen className="text-google-textSecondary flex-shrink-0" size={18} />
                        <h4 className="font-medium text-google-blue group-hover:underline text-lg truncate font-display tracking-tight">
                            {repo.name}
                        </h4>
                    </div>
                    <div className="px-2 py-0.5 border border-google-border rounded-full text-[11px] text-google-textSecondary font-medium flex-shrink-0">
                        {repo.private ? 'Private' : 'Public'}
                    </div>
                </div>

                {repo.impact && repo.impact.score > 0 && (
                    <div className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide ${getInsightStyles(repo.impact.insight)}`}>
                        <Sparkles size={12} />
                        {repo.impact.insight}
                    </div>
                )}
            </div>
            
            {repo.description ? (
                <p className="text-sm text-google-textSecondary mb-4 line-clamp-2 leading-relaxed flex-grow">
                    {repo.description}
                </p>
            ) : <div className="flex-grow"></div>}
            
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-google-border">
                <div className="flex items-center gap-4 text-[13px] text-google-textSecondary font-medium">
                    {repo.language && (
                        <span className="flex items-center gap-1.5">
                            <span
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                            ></span>
                            <span>{repo.language}</span>
                        </span>
                    )}
                    <span className="flex items-center gap-1 hover:text-google-blue transition-colors">
                        <Star size={16} />
                        {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 hover:text-google-blue transition-colors">
                        <GitFork size={16} />
                        {repo.forks_count}
                    </span>
                </div>
            </div>
        </a>
    );
};
