import React from 'react';
import { Star, GitFork, BookOpen, Flame, Award, Hash } from 'lucide-react';

export const StatsGrid = ({ stats }) => {
    if (!stats) return null;

    const items = [
        { icon: Hash, value: stats.totalContributions || 0, label: 'Contributions', color: 'text-google-green', bg: 'bg-google-greenLight' },
        { icon: Star, value: stats.totalStars, label: 'Stars', color: 'text-google-yellow', bg: 'bg-google-yellowLight' },
        { icon: GitFork, value: stats.totalForks, label: 'Forks', color: 'text-google-blue', bg: 'bg-google-blueLight' },
        { icon: Flame, value: stats.currentStreak, label: 'Streak', color: 'text-google-red', bg: 'bg-google-redLight' },
        { icon: Award, value: stats.longestStreak, label: 'Best Streak', color: 'text-google-blue', bg: 'bg-google-blueLight' },
        { icon: BookOpen, value: stats.totalRepos, label: 'Repos', color: 'text-google-green', bg: 'bg-google-greenLight' },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {items.map((item, index) => (
                <div 
                    key={index} 
                    className="material-card p-5 flex flex-col justify-between"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-xl ${item.bg}`}>
                            <item.icon className={item.color} size={20} />
                        </div>
                    </div>
                    <div>
                        <div className="text-3xl font-normal text-google-textPrimary mb-1 font-display tracking-tight">{item.value}</div>
                        <div className="text-xs text-google-textSecondary font-medium uppercase tracking-wide">{item.label}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};
