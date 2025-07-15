import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { ThemeMode } from '../../types';

interface ThemeToggleProps {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  isScrolled: boolean;
  mobile?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  themeMode, 
  isDarkMode, 
  toggleDarkMode, 
  isScrolled, 
  mobile = false 
}) => {
  const getIcon = () => {
    if (themeMode === 'system') {
      return (
        <div className="relative">
          {isDarkMode ? (
            <Moon size={mobile ? 20 : 18} className="hover:text-blue-400" />
          ) : (
            <Sun size={mobile ? 20 : 18} className="hover:text-yellow-400" />
          )}
          <Monitor 
            size={mobile ? 10 : 8} 
            className={`absolute ${mobile ? '-bottom-0.5 -right-0.5' : '-bottom-1 -right-1'} bg-white dark:bg-gray-800 rounded-full p-0.5 border border-current ${mobile ? 'opacity-80' : 'opacity-70'}`}
          />
        </div>
      );
    }
    
    return themeMode === 'dark' ? (
      <Sun size={mobile ? 20 : 18} className="hover:text-yellow-400" />
    ) : (
      <Moon size={mobile ? 20 : 18} className="hover:text-blue-400" />
    );
  };

  const getAriaLabel = () => {
    return `切換主題模式 (目前: ${
      themeMode === 'system' 
        ? `跟隨系統 (${isDarkMode ? '深色' : '淺色'})`
        : themeMode === 'dark' ? '深色模式' : '淺色模式'
    })`;
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`flex items-center ${mobile ? 'mr-2' : 'ml-2'} ${
        isScrolled 
          ? 'text-neutral-800 dark:text-neutral-100 hover:text-eudtech-700 dark:hover:text-eudtech-400' 
          : 'text-white hover:text-eudtech-200 dark:text-gray-100 dark:hover:text-eudtech-300'
      } ${mobile ? 'p-1' : 'px-2 py-2'} rounded-md transition-colors duration-200 relative group`}
      aria-label={getAriaLabel()}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;