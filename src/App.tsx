import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
            <AppRoutes />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;