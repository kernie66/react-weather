import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const lat = import.meta.env.VITE_DEFAULT_LATITUDE;
const lon = import.meta.env.VITE_DEFAULT_LONGITUDE;
const part = 'minutely';
const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const apiURL = `${baseURL}/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}&units=metric`;

const getWeatherData = async () => {
  const { data } = await axios.get(apiURL);
  console.log('apiURL', apiURL);
  console.log('data', data);
  return data;
};

export const useWeatherData = (select) => {
  return useQuery({
    queryKey: ['weatherData'],
    queryFn: getWeatherData,
    select,
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: Infinity,
  });
};

export const useCurrentWeather = () => {
  return useWeatherData((data) => data.current);
};

export const useTodaysWeather = () => {
  return useWeatherData((data) => data.daily[0]);
};
