import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { describe } from 'vitest';
import { useWeatherData } from '../weatherQueries.js';
import { renderHook, waitFor } from '@testing-library/react';

describe('weatherQueries', () => {
  it('should return weather data', async () => {
    const queryClient = new QueryClient();
    const wrapper = ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useWeatherData(), {
      wrapper,
    });

    console.log('result', result.current.lat);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.lat).toEqual(undefined);
  });
});
