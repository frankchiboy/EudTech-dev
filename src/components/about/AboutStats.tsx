import React from 'react';
import { CompanyStats } from '../../data/models/Company';

interface AboutStatsProps {
  stats: CompanyStats[];
}

const AboutStats: React.FC<AboutStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.id}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center group hover:shadow-xl transition-all duration-300"
        >
          <div className="flex justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
            {stat.icon}
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {stat.value}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutStats;