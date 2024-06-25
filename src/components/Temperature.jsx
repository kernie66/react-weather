import { useWeatherData } from '../utils/weatherQueries';
import TemperatureValue from './TemperatureValue.jsx';

export default function Temperature() {
  const { data: weatherData } = useWeatherData();

  console.log('weatherData', weatherData);

  return (
    <TemperatureValue
      tempValue={weatherData?.current?.temp}
      tempClass="outline-temp"
    />
  );
}
