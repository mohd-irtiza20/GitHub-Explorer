import React from 'react';
import { Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';

export const RecommendationsCard = ({ recommendations }) => {
    if (!recommendations || recommendations.length === 0) return null;

    return (
        <div className="dashboard-card p-6 flex flex-col">
            <h3 className="text-lg font-bold flex items-center gap-2 text-white mb-6 font-display">
                <Lightbulb className="text-brand" size={18} />
                AI Learning Path
            </h3>
            
            <div className="space-y-6 flex-grow">
                {recommendations.map((rec, index) => (
                    <div 
                        key={index} 
                        className="relative pl-5 border-l-2 border-gray-700 hover:border-brand transition-colors group"
                    >
                        <div className="absolute -left-[5px] top-1 w-2 h-2 bg-gray-900 border-2 border-gray-600 rounded-full group-hover:border-brand transition-colors"></div>
                        
                        <div className="mb-2">
                            <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                                Based on {rec.language}
                            </span>
                            <h4 className="text-gray-200 font-bold text-base leading-tight mt-1 flex items-center gap-1.5 group-hover:text-brand transition-colors font-display">
                                {rec.next}
                                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                            </h4>
                        </div>
                        
                        <p className="text-sm text-gray-400 leading-relaxed mb-3">
                            {rec.reason}
                        </p>
                        
                        <div className="flex gap-2">
                            {rec.links.map((link, i) => (
                                <a 
                                    key={i}
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[11px] font-medium text-gray-300 hover:text-white flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-2 py-1 rounded border border-gray-700 transition-colors"
                                >
                                    Documentation <ExternalLink size={10} />
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 pt-4 border-t border-gray-800">
                <p className="text-[10px] text-gray-500 text-center">
                    Recommendations are dynamically generated based on your top repository contributions and language focus.
                </p>
            </div>
        </div>
    );
};
