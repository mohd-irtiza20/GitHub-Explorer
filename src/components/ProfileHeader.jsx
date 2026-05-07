import React from 'react';
import { ExternalLink, Share2, Download, MapPin, Link2, Calendar, Sparkles } from 'lucide-react';

export const ProfileHeader = ({ userData, persona, onShare, onSave, cardRef }) => {
    if (!userData) return null;

    return (
        <div ref={cardRef} className="dashboard-card p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start text-center lg:text-left">
                <div className="flex-shrink-0">
                    <img
                        src={userData.avatar_url}
                        alt={userData.login}
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-gray-700 shadow-md object-cover"
                    />
                </div>

                <div className="flex-1 min-w-0 w-full space-y-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5">
                            <h2 className="text-3xl font-bold text-white tracking-tight font-display">
                                {userData.name || userData.login}
                            </h2>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <a
                                    href={userData.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-brand inline-flex items-center gap-1.5 font-medium transition-colors"
                                >
                                    @{userData.login} <ExternalLink size={14} />
                                </a>
                                
                                {persona && (
                                    <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-brand/10 text-brand rounded font-semibold text-[11px] uppercase tracking-wide">
                                        <Sparkles size={12} className="opacity-80" />
                                        {persona.title}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 items-center justify-center sm:justify-end flex-wrap">
                            <button
                                onClick={onShare}
                                className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm text-gray-300 font-medium active:scale-95"
                            >
                                <Share2 size={14} />
                                <span>Share</span>
                            </button>
                            <button
                                onClick={onSave}
                                className="px-3.5 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors flex items-center gap-2 text-sm text-gray-300 font-medium active:scale-95"
                            >
                                <Download size={14} />
                                <span>Save</span>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {userData.bio && (
                            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                {userData.bio}
                            </p>
                        )}
                        
                        {persona && (
                            <div className="inline-flex items-start gap-2.5 p-3.5 bg-gray-800/50 border border-gray-700/50 rounded-lg max-w-2xl">
                                <Sparkles size={16} className="mt-0.5 flex-shrink-0 text-brand/70" />
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    <span className="font-semibold text-brand mr-1">AI Insight:</span>
                                    {persona.bio}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-400 font-medium justify-center lg:justify-start pt-1">
                        {userData.location && (
                            <div className="flex items-center gap-1.5 shrink-0">
                                <MapPin size={14} />
                                <span>{userData.location}</span>
                            </div>
                        )}
                        {userData.blog && (
                            <a
                                href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:text-brand transition-colors shrink-0 max-w-[240px]"
                            >
                                <Link2 size={14} />
                                <span className="truncate">{userData.blog}</span>
                            </a>
                        )}
                        {userData.created_at && (
                            <div className="flex items-center gap-1.5 shrink-0">
                                <Calendar size={14} />
                                <span>Joined {new Date(userData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                        {[
                            { label: 'Followers', value: userData.followers },
                            { label: 'Following', value: userData.following },
                            { label: 'Repositories', value: userData.public_repos },
                            { label: 'Gists', value: userData.public_gists }
                        ].map((stat) => (
                            <div key={stat.label} className="bg-gray-800 border border-gray-700 rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-white font-display">{stat.value}</div>
                                <div className="text-[10px] text-gray-400 mt-0.5 font-bold uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
