import React from 'react';

export const LoadingSkeleton = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="dashboard-card p-6 sm:p-8 flex flex-col lg:row gap-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full relative z-10">
                <div className="w-32 h-32 sm:w-36 sm:h-36 bg-gray-800 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-4 w-full">
                    <div className="h-8 bg-gray-800 rounded-lg w-2/3"></div>
                    <div className="h-4 bg-gray-800 rounded-lg w-1/3"></div>
                    <div className="h-4 bg-gray-800 rounded-lg w-full"></div>
                    <div className="h-4 bg-gray-800 rounded-lg w-3/4"></div>
                    <div className="flex gap-3 pt-3">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-14 bg-gray-800 rounded-lg flex-1"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 dashboard-card relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" style={{ animationDelay: `${i * 100}ms` }}></div>
                </div>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 h-72 dashboard-card relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-32 dashboard-card relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-800/50 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" style={{ animationDelay: `${i * 150}ms` }}></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
