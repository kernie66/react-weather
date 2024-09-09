import { useHourlyWeather } from '../hooks/weatherQueries.js';
import Forecast from './Forecast';
import { getForecasts } from '../helpers/getForecasts.js';
import { Text } from '@mantine/core';
import { isEmpty } from 'radash';

export default function Forecasts() {
  const { data: hourlyWeather } = useHourlyWeather();

  const forecastIndicies = getForecasts(hourlyWeather);

  if (isEmpty(forecastIndicies)) {
    return (
      <Text fz={64} ta="center">
        Ingen väderprognos tillgänglig, är internet anslutet?
      </Text>
    );
  }

  return forecastIndicies.map((index) => (
    <Forecast
      key={index}
      hourlyWeather={hourlyWeather[index]}
      moonPhase={hourlyWeather.moonPhase}
    />
  ));
}
