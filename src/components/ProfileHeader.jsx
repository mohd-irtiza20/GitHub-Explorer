import React from 'react';
import { MapPin, Link2, Calendar, Share2, Download, Sparkles } from 'lucide-react';

export const ProfileHeader = ({ userData, persona, onShare, onSave, cardRef }) => {
    if (!userData) return null;

    return (
        <div ref={cardRef} className="material-card p-6 sm:p-10 relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 w-full h-32 bg-google-blueLight opacity-50"></div>
            
            <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center lg:items-start text-center lg:text-left mt-6">
                <div className="flex-shrink-0 relative">
                    <img
                        src={userData.avatar_url}
                        alt={userData.login}
                        className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-google-2 object-cover bg-white"
                    />
                </div>

                <div className="flex-1 min-w-0 w-full space-y-6 pt-2">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl sm:text-4xl font-normal text-google-textPrimary tracking-tight font-display">
                                {userData.name || userData.login}
                            </h2>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                <a
                                    href={userData.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-google-textSecondary hover:text-google-blue font-medium transition-colors"
                                >
                                    @{userData.login}
                                </a>
                                
                                {persona && (
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-google-blueLight text-google-blueHover rounded-full font-medium text-xs">
                                        <Sparkles size={14} />
                                        {persona.title}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 justify-center">
                            <button
                                onClick={onShare}
                                className="p-2 text-google-textSecondary hover:text-google-blue hover:bg-google-blueLight rounded-full transition-colors"
                                aria-label="Share profile"
                            >
                                <Share2 size={20} />
                            </button>
                            <button
                                onClick={onSave}
                                className="p-2 text-google-textSecondary hover:text-google-blue hover:bg-google-blueLight rounded-full transition-colors"
                                aria-label="Download image"
                            >
                                <Download size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {userData.bio && (
                            <p className="text-google-textPrimary text-base leading-relaxed max-w-3xl mx-auto lg:mx-0">
                                {userData.bio}
                            </p>
                        )}
                        
                        {persona && (
                            <div className="inline-flex items-start gap-3 p-4 bg-google-surfaceHover rounded-2xl max-w-3xl">
                                <Sparkles size={20} className="mt-0.5 flex-shrink-0 text-google-blue" />
                                <p className="text-google-textPrimary text-sm leading-relaxed">
                                    <span className="font-semibold text-google-blue mr-1">AI Insight:</span>
                                    {persona.bio}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-google-textSecondary font-medium justify-center lg:justify-start">
                        {userData.location && (
                            <div className="flex items-center gap-1.5 shrink-0">
                                <MapPin size={16} className="text-google-blue" />
                                <span>{userData.location}</span>
                            </div>
                        )}
                        {userData.blog && (
                            <a
                                href={userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 hover:text-google-blue transition-colors shrink-0 max-w-[240px]"
                            >
                                <Link2 size={16} className="text-google-blue" />
                                <span className="truncate">{userData.blog}</span>
                            </a>
                        )}
                        {userData.created_at && (
                            <div className="flex items-center gap-1.5 shrink-0">
                                <Calendar size={16} className="text-google-blue" />
                                <span>Joined {new Date(userData.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
