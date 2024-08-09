import { useMemo } from 'react';
import { WeatherThemeContext } from './Contexts.js';

export default function WeatherThemeProvider({ children }) {
  const value = useMemo(() => {
    return {};
  }, []);
  return (
    <WeatherThemeContext.Provider value={value}>
      {children}
    </WeatherThemeContext.Provider>
  );
}
