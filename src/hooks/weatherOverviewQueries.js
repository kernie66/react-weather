import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import queryPersister from '../helpers/queryPersister.js';
import { useAtomValue } from 'jotai';
import { currentPositionState } from '../atoms/locationStates.js';

const baseURL = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
const overviewApiURL = `${baseURL}/onecall/overview?appid=${apiKey}&units=metric`;
const maxAge = 1000 * 60 * 60 * 24; // 1 day

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
    staleTime: 1000 * 60 * 60, // 60 minutes
    gcTime: maxAge,
    persister: queryPersister(maxAge),
  });
};
