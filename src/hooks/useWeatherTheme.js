import { useContext } from 'react';
import { WeatherThemeContext } from '../contexts/Contexts.js';

export default function useWeatherTheme() {
  return useContext(WeatherThemeContext);
}
