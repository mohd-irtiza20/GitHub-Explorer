import React from 'react';

export const LoadingSkeleton = () => (
    <div className="space-y-6 animate-fade-in">
        <div className="material-card p-6 sm:p-10 flex flex-col lg:row gap-6 relative overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-google-surfaceHover to-transparent -translate-x-full animate-shimmer-light"></div>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start w-full relative z-10">
                <div className="w-32 h-32 sm:w-40 sm:h-40 bg-google-border rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-4 w-full">
                    <div className="h-10 bg-google-border rounded-lg w-1/2"></div>
                    <div className="h-5 bg-google-surfaceHover rounded-lg w-1/3"></div>
                    <div className="h-5 bg-google-surfaceHover rounded-lg w-full mt-4"></div>
                    <div className="h-5 bg-google-surfaceHover rounded-lg w-3/4"></div>
                    <div className="flex gap-4 pt-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-12 bg-google-surfaceHover rounded-lg flex-1"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 material-card relative overflow-hidden bg-white">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-google-surfaceHover to-transparent -translate-x-full animate-shimmer-light" style={{ animationDelay: `${i * 100}ms` }}></div>
                </div>
            ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 h-80 material-card relative overflow-hidden bg-white">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-google-surfaceHover to-transparent -translate-x-full animate-shimmer-light"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-36 material-card relative overflow-hidden bg-white">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-google-surfaceHover to-transparent -translate-x-full animate-shimmer-light" style={{ animationDelay: `${i * 150}ms` }}></div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
