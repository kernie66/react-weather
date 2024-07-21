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
            <Header />
            <ErrorBoundary>
              <Body />
            </ErrorBoundary>
          </Background>
        </LocationProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
