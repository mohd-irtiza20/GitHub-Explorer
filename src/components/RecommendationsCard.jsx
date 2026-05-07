import React from 'react';
import { Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';

export const RecommendationsCard = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) return null;

    return (
        <div className="material-card p-6 sm:p-8 flex flex-col">
            <h3 className="text-xl font-normal flex items-center gap-2 text-google-textPrimary mb-6 font-display">
                <Lightbulb className="text-google-yellow" size={20} />
                AI Learning Path
            </h3>
            
            <div className="space-y-6 flex-grow">
                {recommendations.map((rec, index) => (
                    <div 
                        key={index} 
                        className="relative pl-5 border-l-2 border-google-border hover:border-google-blue transition-colors group"
                    >
                        <div className="absolute -left-[7px] top-1 w-3 h-3 bg-white border-2 border-google-border rounded-full group-hover:border-google-blue transition-colors"></div>
                        
                        <div className="mb-2">
                            <span className="text-[11px] uppercase tracking-wider font-medium text-google-textSecondary">
                                Based on {rec.language}
                            </span>
                            <h4 className="text-google-textPrimary font-medium text-base leading-tight mt-1 flex items-center gap-1.5 group-hover:text-google-blue transition-colors">
                                {rec.next}
                                <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0 text-google-blue" />
                            </h4>
                        </div>
                        
                        <p className="text-sm text-google-textSecondary leading-relaxed mb-3">
                            {rec.reason}
                        </p>
                        
                        <div className="flex gap-2">
                            {rec.links.map((link, i) => (
                                <a 
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[12px] font-medium text-google-blue hover:text-google-blueHover flex items-center gap-1 bg-google-blueLight px-3 py-1.5 rounded-full transition-colors"
                                >
                                    Documentation <ExternalLink size={12} />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-google-border">
                <p className="text-[12px] text-google-textSecondary text-center">
                    Recommendations are dynamically generated based on your top repository contributions and language focus.
                </p>
            </div>
        </div>
    );
};
