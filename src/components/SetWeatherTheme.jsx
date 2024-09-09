import { useLayoutEffect } from 'react';
import { useCurrentWeather } from '../hooks/weatherQueries.js';
import { getWeatherTheme } from '../helpers/getWeatherTheme.js';
import { useSetAtom } from 'jotai';
import { weatherThemeState } from '../atoms/weatherThemeStates.js';
import { useLogger } from '@mantine/hooks';

export default function SetWeatherTheme({ children }) {
  const { data: currentWeather } = useCurrentWeather();
  const setWeatherTheme = useSetAtom(weatherThemeState);

  useLogger('SetWeatherTheme', [{ currentWeather }]);

  useLayoutEffect(() => {
    if (currentWeather) {
      const newWeatherTheme = getWeatherTheme(currentWeather);
      console.log('Weather theme:', newWeatherTheme);
      setWeatherTheme(newWeatherTheme);
    }
  }, [currentWeather, setWeatherTheme]);

  return <>{children}</>;
}
