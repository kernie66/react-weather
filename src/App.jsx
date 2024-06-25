import { useEffect } from 'react';
import WebFont from 'webfontloader';
import Background from './components/Background';
import Body from './components/Body';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import './App.css';
import AddressProvider from './contexts/AddressProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function App() {
  // Load fonts used in the app
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Chivo Mono'],
      },
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ErrorBoundary>
        <Background>
          <AddressProvider>
            <Header />
            <ErrorBoundary>
              <Body />
            </ErrorBoundary>
          </AddressProvider>
        </Background>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
