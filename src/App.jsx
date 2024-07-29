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
import { isEmpty } from 'radash';

const queryClient = new QueryClient();

dayjs.locale('sv');
dayjs.extend(localizedFormat);
dayjs.extend(calendar);

console.debug('Runs in App.jsx');

const storedLocation = localStorage.getItem('location');
console.log('Stored location:', storedLocation);
if (
  storedLocation &&
  (isEmpty(storedLocation) || storedLocation === '{}')
) {
  console.log('Location key is empty, removed from localStorage');
  localStorage.removeItem('location');
}

const storedHistory = localStorage.getItem('locationHistory');
console.log('Stored history locations:', storedHistory);
if (isEmpty(storedHistory) || storedHistory === '[{}]') {
  console.log(
    'History location key is empty, removed from localStorage'
  );
  localStorage.removeItem('locationHistory');
}

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
