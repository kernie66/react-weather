import { useHourlyWeather } from '../utils/weatherQueries.js';
import Forecast from './Forecast';
import { getForecasts } from '../helpers/getForecasts.js';
import { Text } from '@mantine/core';
import { isEmpty } from 'radash';
import { useEffect, useState } from 'react';

export default function Forecasts() {
  const { data: hourlyWeather } = useHourlyWeather();
  const [forecasts, setForecasts] = useState([]);

  useEffect(() => {
    const newForecasts = getForecasts(hourlyWeather);
    setForecasts(newForecasts);
  }, [hourlyWeather]);

  if (isEmpty(forecasts)) {
    return (
      <Text fz={64} ta="center">
        Ingen väderprognos tillgänglig, är internet anslutet?
      </Text>
    );
  }

  return forecasts.map((index) => (
    <Forecast
      key={index}
      hourlyWeather={hourlyWeather[index]}
      moonPhase={hourlyWeather.moonPhase}
    />
  ));
}
