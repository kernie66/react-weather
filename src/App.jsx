import { useEffect } from 'react';
import WebFont from 'webfontloader';
import Background from './components/Background';
import Body from './components/Body';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import './App.css';
import AddressProvider from './contexts/AddressProvider';

export const iPadSize = { width: 1112, height: 759, fsHeight: 814 };

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
  );
}
