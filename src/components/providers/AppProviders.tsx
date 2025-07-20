import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ErrorBoundary from '../common/ErrorBoundary/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  console.log('AppProviders rendering');
  
  return (
    <ErrorBoundary>
      <React.Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">載入中...</p>
          </div>
        </div>
      }>
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              {children}
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default AppProviders;