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

    const maxPct = languages[0][1]; // already sorted by %, top is max

    return (
        <div className="glass-card gradient-border rounded-2xl p-6 sm:p-8 h-full">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-white font-display">
                <Code2 className="text-[#8b949e]" size={18} />
                Language Mix
            </h3>
            <div className="space-y-5">
                {languages.map(([lang, pct], index) => {
                    const barWidth = Math.max((pct / maxPct) * 100, 4);
                    return (
                        <div key={lang} className="group">
                            <div className="flex justify-between mb-2 text-sm">
                                <span className="flex items-center gap-2 text-[#c9d1d9] font-semibold">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shadow-sm"
                                        style={{ backgroundColor: getLanguageColor(lang), boxShadow: `0 0 8px ${getLanguageColor(lang)}40` }}
                                    ></span>
                                    <span>{lang}</span>
                                </span>
                                <span className="text-[#8b949e] font-mono text-xs">{pct}%</span>
                            </div>
                            <div className="h-2 bg-[#0d1117] rounded-full overflow-hidden border border-[#21262d]">
                                <div
                                    className="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                                    style={{
                                        width: `${barWidth}%`,
                                        backgroundColor: getLanguageColor(lang),
                                        animationDelay: `${index * 0.15}s`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-10 pt-6 border-t border-[#30363d]/50 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#21262d]/60 border border-[#30363d]/50 rounded-full backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 bg-[#3fb950] rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest">
                        Diversity Score: {Math.min((languages.length / 5) * 100, 100).toFixed(0)}
                    </span>
                </div>
            </div>
        </div>
    );
};
