import { useHourlyWeather } from '../hooks/weatherQueries.js';
import Forecast from './Forecast';
import { getForecasts } from '../helpers/getForecasts.js';
import { Text } from '@mantine/core';
import { isEmpty } from 'radash';

export default function Forecasts() {
  const { data: hourlyWeather } = useHourlyWeather();

  if (!hourlyWeather) {
    return (
      <Text
        fz={36}
        c="orange.8"
        fw={500}
        fs="italic"
        ta="center"
        w="100vw"
      >
        Väntar på väderdata
      </Text>
    );
  }

  const forecastIndicies = getForecasts(hourlyWeather);

  if (isEmpty(forecastIndicies)) {
    return (
      <Text
        fz={36}
        c="orange.8"
        fw={500}
        fs="italic"
        ta="center"
        w="100vw"
      >
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
