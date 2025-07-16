import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '../../contexts/ThemeContext';
import { LanguageProvider } from '../../contexts/LanguageContext';
import ErrorBoundary from '../common/ErrorBoundary/ErrorBoundary';

interface AppProvidersProps {
  children: React.ReactNode;
}

const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <Router>
            {children}
          </Router>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default AppProviders;