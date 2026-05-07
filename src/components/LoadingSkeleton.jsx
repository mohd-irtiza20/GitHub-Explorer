import React from 'react';

export const LoadingSkeleton = () => (
    <div className="space-y-8 animate-fade-in">
        <div className="glass-card rounded-2xl p-8 flex flex-col lg:row gap-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start w-full relative z-10">
                <div className="w-40 h-40 bg-[#21262d] rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-4 w-full">
                    <div className="h-8 bg-[#21262d] rounded-lg w-2/3"></div>
                    <div className="h-4 bg-[#21262d] rounded-lg w-1/3"></div>
                    <div className="h-4 bg-[#21262d] rounded-lg w-full"></div>
                    <div className="h-4 bg-[#21262d] rounded-lg w-3/4"></div>
                    <div className="flex gap-4 pt-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-16 bg-[#21262d] rounded-xl flex-1"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 glass-card rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%', animationDelay: `${i * 0.1}s` }}></div>
                </div>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 h-80 glass-card rounded-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 glass-card rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%', animationDelay: `${i * 0.15}s` }}></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
