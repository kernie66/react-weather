import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAddress } from '../contexts/AddressProvider.jsx';
import { useEffect } from 'react';

const part = 'minutely';
const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

export const useWeatherData = (select) => {
  const { getPosition } = useAddress();
  const queryClient = useQueryClient();

  const apiURL = `${baseURL}/onecall?lat=${getPosition.lat}&lon=${getPosition.lng}&exclude=${part}&appid=${apiKey}&units=metric`;

  const getWeatherData = async () => {
    const { data } = await axios.get(apiURL);
    console.log('apiURL', apiURL);
    console.log('data', data);
    return data;
  };

  useEffect(() => {
    console.log('Position updated', getPosition);
    queryClient.invalidateQueries({ queryKey: ['weatherData'] });
  }, [getPosition, queryClient]);

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
