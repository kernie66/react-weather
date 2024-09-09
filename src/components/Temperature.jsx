import { useCurrentWeather } from '../hooks/weatherQueries';
import TemperatureValue from './TemperatureValue.jsx';

export default function Temperature() {
  const { data: weatherData } = useCurrentWeather();

  return <TemperatureValue tempValue={weatherData?.temp} />;
}
