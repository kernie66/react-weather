import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { describe, expect } from 'vitest';
import {
  useCurrentWeather,
  useDailyWeather,
  useHourlyWeather,
  useTodaysWeather,
  useWeatherAlerts,
  useWeatherData,
  useWeatherPosition,
  useWeeklyWeather,
} from '../weatherQueries.js';
import { renderHook, waitFor } from '@testing-library/react';
import weatherDataJson from '../../../bruno/weather_alert_response.json';

const queryClient = new QueryClient();
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
);

describe('weatherQueries', () => {
  it('should return complete weather data', async () => {
    const { result } = renderHook(() => useWeatherData(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data.lat).toBe(weatherDataJson.lat);
    expect(result.current.data.lon).toBe(weatherDataJson.lon);
    expect(result.current.data.current).toBeDefined();
    expect(result.current.data.current.weather).toHaveLength(1);
    expect(result.current.data.hourly).toHaveLength(48);
    expect(result.current.data.daily).toHaveLength(8);
    expect(result.current.data.alerts).toHaveLength(1);
    expect(result.current.data).not.toHaveProperty('minutely');
  });

  it('should return only current weather data', async () => {
    const { result } = renderHook(() => useCurrentWeather(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data.lat).toBe(weatherDataJson.lat);
    expect(result.current.data.lon).toBe(weatherDataJson.lon);
    expect(result.current.data.weather).toHaveLength(1);
    expect(result.current.data).toHaveProperty(
      'temp',
      weatherDataJson.current.temp
    );
    expect(result.current.data).toHaveProperty(
      'moonPhase',
      weatherDataJson.daily[0].moon_phase
    );
    expect(result.current.data).not.toHaveProperty('hourly');
  });

  it('should return only hourly weather data', async () => {
    const { result } = renderHook(() => useHourlyWeather(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data.lat).toBe(weatherDataJson.lat);
    expect(result.current.data.lon).toBe(weatherDataJson.lon);
    expect(result.current.data).toHaveLength(48);
    expect(result.current.data[0]).toHaveProperty(
      'temp',
      weatherDataJson.hourly[0].temp
    );
    expect(result.current.data).toHaveProperty(
      'moonPhase',
      weatherDataJson.daily[1].moon_phase
    );
  });

  it('should return only daily weather data, index 0', async () => {
    const { result } = renderHook(() => useDailyWeather(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data.weather[0]).toStrictEqual(
      weatherDataJson.daily[0].weather[0]
    );
    expect(result.current.data).toHaveProperty(
      'temp',
      weatherDataJson.daily[0].temp
    );
  });

  it('should return only daily weather data, index 7', async () => {
    const { result } = renderHook(() => useDailyWeather(7), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data.weather[0]).toStrictEqual(
      weatherDataJson.daily[7].weather[0]
    );
    expect(result.current.data).toHaveProperty(
      'temp',
      weatherDataJson.daily[7].temp
    );
  });

  it('should return only todays weather data', async () => {
    const { result } = renderHook(() => useTodaysWeather(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data.weather[0]).toStrictEqual(
      weatherDataJson.daily[0].weather[0]
    );
    expect(result.current.data).toHaveProperty(
      'temp',
      weatherDataJson.daily[0].temp
    );
  });

  it('should return only weekly weather data', async () => {
    const { result } = renderHook(() => useWeeklyWeather(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(8);
    expect(result.current.data[1]).toHaveProperty(
      'temp',
      weatherDataJson.daily[1].temp
    );
  });

  it('should return weather alerts', async () => {
    const { result } = renderHook(() => useWeatherAlerts(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data[0]).toHaveProperty(
      'event',
      weatherDataJson.alerts[0].event
    );
  });

  it('should return weather position', async () => {
    const { result } = renderHook(() => useWeatherPosition(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data.lat).toBe(weatherDataJson.lat);
    expect(result.current.data.lon).toBe(weatherDataJson.lon);
    expect(result.current.data).toHaveProperty('time');
  });
});
