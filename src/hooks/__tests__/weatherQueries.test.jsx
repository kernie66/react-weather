import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { describe } from 'vitest';
import { useWeatherData } from '../weatherQueries.js';
import { renderHook, waitFor } from '@testing-library/react';
import weatherDataJson from '../../../bruno/weather_alert_response.json';

describe('weatherQueries', () => {
  it('should return complete weather data', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useWeatherData(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    // console.log('result', result.current.data);
    expect(result.current.data.lat).toBe(weatherDataJson.lat);
    expect(result.current.data.lon).toBe(weatherDataJson.lon);
    expect(result.current.data.current).toBeDefined();
    expect(result.current.data.current.weather).toHaveLength(1);
    expect(result.current.data.hourly).toHaveLength(48);
    expect(result.current.data.daily).toHaveLength(8);
    expect(result.current.data.alerts).toHaveLength(1);
  });
});
