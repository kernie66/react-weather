import Background from './components/Background';
import Body from './components/Body';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import './App.css';
import LocationProvider from './contexts/LocationProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import calendar from 'dayjs/plugin/calendar.js';
import MapLocationProvider from './contexts/MapLocationProvider.jsx';

const queryClient = new QueryClient();

dayjs.locale('sv');
dayjs.extend(localizedFormat);
dayjs.extend(calendar);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition="bottom-left"
      />
      <ErrorBoundary>
        <LocationProvider>
          <Background>
            <MapLocationProvider>
              <Header />
              <ErrorBoundary>
                <Body />
              </ErrorBoundary>
            </MapLocationProvider>
          </Background>
        </LocationProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
