import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAddress } from '../contexts/AddressProvider.jsx';
import { useCallback, useMemo } from 'react';
import queryPersister from '../helpers/queryPersister.js';

const part = 'minutely';
const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const apiURL = `${baseURL}/onecall?exclude=${part}&appid=${apiKey}&units=metric&lang=sv`;
const maxAge = 1000 * 60 * 60 * 24; // 1 day

export const useWeatherData = (select) => {
  const { getPosition } = useAddress();

  const apiFullURL = useMemo(
    () => apiURL + `&lat=${getPosition.lat}&lon=${getPosition.lng}`,
    [getPosition]
  );

  const getWeatherData = useCallback(async () => {
    const { data } = await axios.get(apiFullURL);
    return data;
  }, [apiFullURL]);

  return useQuery({
    queryKey: ['weatherData'],
    queryFn: getWeatherData,
    select,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: maxAge,
    persister: queryPersister(maxAge),
  });
};

const selectCurrentData = (data) => {
  const current = data.current;
  current.moonPhase = data.daily[0].moon_phase;
  return current;
};

export const useCurrentWeather = () => {
  return useWeatherData(selectCurrentData);
};

const selectHourlyData = (data) => {
  const hourly = data.hourly;
  hourly.moonPhase = data.daily[0].moon_phase;
  return hourly;
};

export const useHourlyWeather = () => {
  return useWeatherData(selectHourlyData);
};

const selectDailyData = (data) => data.daily[0];

export const useTodaysWeather = () => {
  return useWeatherData(selectDailyData);
};
