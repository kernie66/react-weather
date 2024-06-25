import { useCurrentWeather } from '../utils/weatherQueries';
import TemperatureValue from './TemperatureValue.jsx';

export default function Temperature() {
  const { data: weatherData } = useCurrentWeather();

  console.log('weatherData', weatherData);

  return (
    <TemperatureValue
      tempValue={weatherData?.temp}
      tempClass="outline-temp"
    />
  );
}
