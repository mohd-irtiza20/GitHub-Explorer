import React from 'react';
import { Star, GitFork, BookOpen, Flame, Award, Hash, TrendingUp } from 'lucide-react';

export const StatsGrid = ({ stats }) => {
    if (!stats) return null;

    const items = [
        { icon: Hash, value: stats.totalContributions || 0, label: 'Contributions', color: 'text-[#3fb950]', bgGlow: 'from-emerald-500/10' },
        { icon: Star, value: stats.totalStars, label: 'Stars', color: 'text-yellow-500', bgGlow: 'from-yellow-500/10' },
        { icon: GitFork, value: stats.totalForks, label: 'Forks', color: 'text-blue-500', bgGlow: 'from-blue-500/10' },
        { icon: Flame, value: stats.currentStreak, label: 'Streak', color: 'text-[#ff7b72]', bgGlow: 'from-red-500/10' },
        { icon: Award, value: stats.longestStreak, label: 'Best', color: 'text-[#d2a8ff]', bgGlow: 'from-purple-500/10' },
        { icon: BookOpen, value: stats.totalRepos, label: 'Repos', color: 'text-[#a5d6ff]', bgGlow: 'from-sky-500/10' },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className={`glass-card rounded-xl p-5 group stat-glow relative overflow-hidden stagger-${index + 1} animate-scale-in opacity-0`}
                >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <item.icon className={`${item.color} transition-transform group-hover:scale-110`} size={20} />
                            <TrendingUp className="text-[#30363d] group-hover:text-[#484f58] transition-colors" size={14} />
                        </div>
                        <div className="text-2xl font-bold text-white mb-0.5 font-display">{item.value}</div>
                        <div className="text-[10px] text-[#8b949e] font-bold uppercase tracking-widest">{item.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
