import React from 'react';
import { Star, GitFork, BookOpen, Flame, Award, Hash, TrendingUp } from 'lucide-react';

export const StatsGrid = ({ stats }) => {
    if (!stats) return null;

    const items = [
        { icon: Hash, value: stats.totalContributions || 0, label: 'Contributions', color: 'text-emerald-500' },
        { icon: Star, value: stats.totalStars, label: 'Stars', color: 'text-yellow-500' },
        { icon: GitFork, value: stats.totalForks, label: 'Forks', color: 'text-blue-500' },
        { icon: Flame, value: stats.currentStreak, label: 'Streak', color: 'text-orange-500' },
        { icon: Award, value: stats.longestStreak, label: 'Best', color: 'text-purple-500' },
        { icon: BookOpen, value: stats.totalRepos, label: 'Repos', color: 'text-cyan-500' },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className={`dashboard-card p-4 group animate-slide-up opacity-0`}
                    style={{ animationDelay: \`\${index * 50}ms\` }}
                >
                    <div className="flex items-center justify-between mb-2">
                        <item.icon className={`${item.color}`} size={18} />
                    </div>
                    <div className="text-2xl font-bold text-white mb-0.5 font-display">{item.value}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{item.label}</div>
                </div>
            ))}
        </div>
    );
};
