import React from 'react';
import { Code2 } from 'lucide-react';

const getLanguageColor = (lang) => {
    const colors = {
        JavaScript: '#F9AB00',
        TypeScript: '#1A73E8',
        Python: '#1A73E8',
        Java: '#D93025',
        Go: '#1A73E8',
        Rust: '#E37400',
        Ruby: '#D93025',
        PHP: '#5F6368',
        CSS: '#1E8E3E',
        HTML: '#E37400',
        'C++': '#1A73E8',
        C: '#5F6368',
        'C#': '#1E8E3E',
        Swift: '#E37400',
        Kotlin: '#A142F4',
        Vue: '#1E8E3E',
        React: '#1A73E8',
    };
    return colors[lang] || '#5F6368';
};

export const LanguageStats = ({ languages }) => {
    if (!languages || languages.length === 0) return null;

    const maxPct = languages[0][1];

    return (
        <div className="material-card p-6 sm:p-8 h-full">
            <h3 className="text-xl font-normal mb-6 flex items-center gap-2 text-google-textPrimary font-display">
                <Code2 className="text-google-blue" size={20} />
                Language Mix
            </h3>
            <div className="space-y-5">
                {languages.map(([lang, pct]) => {
                    const barWidth = Math.max((pct / maxPct) * 100, 4);
                    return (
                        <div key={lang} className="group">
                            <div className="flex justify-between mb-2 text-sm">
                                <span className="flex items-center gap-2 text-google-textPrimary font-medium">
                                    <span
                                        className="w-3 h-3 rounded-full"
                                        style={{ backgroundColor: getLanguageColor(lang) }}
                                    ></span>
                                    <span>{lang}</span>
                                </span>
                                <span className="text-google-textSecondary font-mono text-sm">{pct}%</span>
                            </div>
                            <div className="h-2 bg-google-surfaceHover rounded-full overflow-hidden">
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
            
            <div className="mt-8 pt-6 border-t border-google-border text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-google-greenLight text-google-green rounded-full">
                    <span className="w-2 h-2 bg-google-green rounded-full"></span>
                    <span className="text-xs font-medium tracking-wide">
                        Diversity Score: {Math.min((languages.length / 5) * 100, 100).toFixed(0)}
                    </span>
                </div>
            </div>
        </div>
    );
};
