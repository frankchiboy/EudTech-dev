import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { ThemeMode } from '../../../../types';

interface ThemeToggleProps {
  themeMode: ThemeMode;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  textColor: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  themeMode,
  isDarkMode,
  toggleDarkMode,
  textColor
}) => {
  const getIcon = () => {
    if (themeMode === 'system') {
      return (
        <div className="relative">
          {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          <Monitor size={8} className="absolute -bottom-1 -right-1 opacity-70" />
        </div>
      );
    }
    return themeMode === 'dark' ? <Sun size={18} /> : <Moon size={18} />;
  };

  return (
    <button
      onClick={toggleDarkMode}
      className={`${textColor} hover:opacity-80 p-2 rounded-md transition-all duration-200`}
      aria-label={`切換主題 (${themeMode})`}
    >
      {getIcon()}
    </button>
  );
};

export default ThemeToggle;