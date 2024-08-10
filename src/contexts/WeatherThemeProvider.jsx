import { useEffect, useMemo, useState } from 'react';
import { WeatherThemeContext } from './Contexts.js';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import {
  defaultBackgroundColor,
  defaultBackgroundImage,
  defaultInfoColor,
  defaultTempColor,
  getWeatherTheme,
} from '../helpers/getWeatherTheme.js';

export default function WeatherThemeProvider({ children }) {
  const [weatherTheme, setWeatherTheme] = useState({
    backgroundImage: defaultBackgroundImage,
    backgroundColor: defaultBackgroundColor,
    infoColor: defaultInfoColor,
    tempColor: defaultTempColor,
  });
  const { data: currentWeather } = useCurrentWeather();

  useEffect(() => {
    if (currentWeather) {
      const newWeatherTheme = getWeatherTheme(currentWeather);
      console.log('Weather theme:', newWeatherTheme);
      setWeatherTheme(newWeatherTheme);
    }
  }, [currentWeather]);

  const value = useMemo(() => {
    return {
      weatherTheme,
    };
  }, [weatherTheme]);

  return (
    <WeatherThemeContext.Provider value={value}>
      {children}
    </WeatherThemeContext.Provider>
  );
}
