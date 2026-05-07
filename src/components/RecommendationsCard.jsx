import React from 'react';
import { Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';

export const RecommendationsCard = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) return null;

    return (
        <div className="glass-card gradient-border rounded-2xl p-6 flex flex-col">
            <h3 className="text-xl font-bold flex items-center gap-2 text-white mb-6 font-display">
                <Lightbulb className="text-yellow-500" size={20} />
                AI Learning Path
            </h3>
            
            <div className="space-y-6 flex-grow">
                {recommendations.map((rec, index) => (
                    <div 
                        key={index} 
                        className="relative pl-6 border-l-2 border-blue-500/20 hover:border-blue-500/60 transition-all group"
                    >
                        <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#0d1117] border-2 border-blue-500/50 rounded-full group-hover:bg-blue-500 group-hover:border-blue-500 transition-all group-hover:shadow-[0_0_8px_rgba(88,166,255,0.4)]"></div>
                        
                        <div className="mb-2">
                            <span className="text-[10px] uppercase tracking-widest font-bold text-[#8b949e]">
                                Based on {rec.language}
                            </span>
                            <h4 className="text-[#58a6ff] font-bold text-lg leading-tight mt-1 flex items-center gap-2 group-hover:translate-x-1 transition-transform font-display">
                                {rec.next}
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h4>
                        </div>
                        
                        <p className="text-sm text-[#8b949e] leading-relaxed mb-3">
                            {rec.reason}
                        </p>
                        
                        <div className="flex gap-3">
                            {rec.links.map((link, i) => (
                                <a 
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-bold text-[#c9d1d9] hover:text-white flex items-center gap-1 bg-[#21262d]/60 hover:bg-[#21262d] px-2 py-1 rounded border border-[#30363d]/50 transition-all hover:border-[#58a6ff]/30"
                                >
                                    Documentation <ExternalLink size={10} />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-[#30363d]/30 opacity-50">
                <p className="text-[10px] text-[#8b949e] italic text-center">
                    Recommendations are dynamically generated based on your top repository contributions and language focus.
                </p>
            </div>
        </div>
    );
};
