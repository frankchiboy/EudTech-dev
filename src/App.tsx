import React from 'react';
import AppProviders from './components/providers/AppProviders';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
    <AppProviders>
      <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
        <AppRoutes />
      </div>
    </AppProviders>
  );
}

export default App;