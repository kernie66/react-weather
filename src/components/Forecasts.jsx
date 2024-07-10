import { useWeatherData } from '../utils/weatherQueries.js';
import Forecast from './Forecast';

export default function Forecasts() {
  const { data: weatherData } = useWeatherData();
  const forecasts = [];

  for (let i = 1; i <= 12; i++) {
    forecasts.push(i.toString());
  }

  return forecasts.map((forecast) => (
    <Forecast
      key={forecast}
      hourlyWeather={weatherData.hourly[forecast]}
      moonPhase={0.5}
    />
  ));
}
