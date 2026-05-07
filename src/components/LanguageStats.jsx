import React from 'react';
import { Code2 } from 'lucide-react';

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
        Kotlin: '#A97BFF',
        Vue: '#41b883',
        React: '#61dafb',
    };
    return colors[lang] || '#8b949e';
};

export const LanguageStats = ({ languages }) => {
    if (!languages || languages.length === 0) return null;

    const maxPct = languages[0][1];

    return (
        <div className="dashboard-card p-6 sm:p-8 h-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white font-display">
                <Code2 className="text-gray-400" size={18} />
                Language Mix
            </h3>
            <div className="space-y-5">
                {languages.map(([lang, pct]) => {
                    const barWidth = Math.max((pct / maxPct) * 100, 4);
                    return (
                        <div key={lang} className="group">
                            <div className="flex justify-between mb-2 text-sm">
                                <span className="flex items-center gap-2 text-gray-300 font-medium">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full"
                                        style={{ backgroundColor: getLanguageColor(lang) }}
                                    ></span>
                                    <span>{lang}</span>
                                </span>
                                <span className="text-gray-400 font-mono text-xs">{pct}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out"
                                    style={{
                                        width: `${barWidth}%`,
                                        backgroundColor: getLanguageColor(lang),
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-800 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-md">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full active-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Diversity Score: {Math.min((languages.length / 5) * 100, 100).toFixed(0)}
                    </span>
                </div>
            </div>
        </div>
    );
};
