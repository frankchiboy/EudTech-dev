import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import AppProviders from './components/providers/AppProviders';
import AppRoutes from './components/AppRoutes';
import VersionChecker from './components/common/VersionChecker';

interface AppProps {
  initialPath: string;
  helmetContext?: { helmet?: HelmetServerState };
}

function App({ initialPath, helmetContext }: AppProps) {
  return (
    <HelmetProvider context={helmetContext}>
      <AppProviders initialPath={initialPath}>
        <VersionChecker />
        <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900">
          <AppRoutes />
        </div>
      </AppProviders>
    </HelmetProvider>
  );
}

export default App;
