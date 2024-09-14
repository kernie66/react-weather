import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import queryPersister from '../helpers/queryPersister.js';
import dayjs from 'dayjs';
import { inRange, isInt } from 'radash';
import { useAtomValue } from 'jotai';
import { currentPositionState } from '../atoms/locationStates.js';

const part = 'minutely';
const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const apiURL = `${baseURL}/onecall?exclude=${part}&appid=${apiKey}&units=metric&lang=sv`;
const overviewApiURL = `${baseURL}/onecall/overview?appid=${apiKey}&units=metric`;
const maxAge = 1000 * 60 * 60 * 24; // 1 day

export const useWeatherData = (select) => {
  const currentPosition = useAtomValue(currentPositionState);

  const apiFullURL = useMemo(
    () =>
      apiURL +
      `&lat=${currentPosition.lat}&lon=${currentPosition.lng}`,
    [currentPosition]
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
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    gcTime: maxAge,
    persister: queryPersister(maxAge),
  });
};

export const useWeatherOverview = (select) => {
  const currentPosition = useAtomValue(currentPositionState);

  const overviewApiFullURL = useMemo(
    () =>
      overviewApiURL +
      `&lat=${currentPosition.lat}&lon=${currentPosition.lng}`,
    [currentPosition]
  );

  const getWeatherOverview = useCallback(async () => {
    const { data } = await axios.get(overviewApiFullURL);
    return data;
  }, [overviewApiFullURL]);

  return useQuery({
    queryKey: ['weatherOverview'],
    queryFn: getWeatherOverview,
    select,
    staleTime: 1000 * 60 * 30, // 30 minutes
    gcTime: maxAge,
    persister: queryPersister(maxAge),
  });
};

const selectCurrentData = (data) => {
  const current = data.current;
  current.moonPhase = data.daily[0].moon_phase;
  current.lat = data.lat;
  current.lon = data.lon;
  return current;
};

export const useCurrentWeather = () => {
  return useWeatherData(selectCurrentData);
};

const selectHourlyData = (data) => {
  const hourly = data.hourly;
  hourly.moonPhase = data.daily[1].moon_phase;
  hourly.lat = data.lat;
  hourly.lon = data.lon;
  return hourly;
};

export const useHourlyWeather = () => {
  return useWeatherData(selectHourlyData);
};

export const useDailyWeather = (dayIndex) => {
  let index = 0;
  if (isInt(dayIndex) && inRange(dayIndex, 0, 8)) {
    index = dayIndex;
  }
  return useWeatherData((data) => data.daily[index]);
};

export const useTodaysWeather = () => {
  return useDailyWeather(0);
};

export const useWeeklyWeather = () => {
  return useWeatherData((data) => data.daily);
};

const selectAlertData = (data) => data.alerts;

export const useWeatherAlerts = () => {
  return useWeatherData(selectAlertData);
};

const selectPosition = (data) => {
  const position = {
    lat: data.lat,
    lon: data.lon,
    timezone: data.timezone,
    time: dayjs.unix(data.current.dt),
  };
  return position;
};

export const useWeatherPosition = () => {
  return useWeatherData(selectPosition);
};
