import { Group, Image, Stack, Text } from '@mantine/core';
import { getWeatherIconUrl } from '../helpers/getImageUrl.js';
import { useWeatherData } from '../utils/weatherQueries.js';
import { capitalize } from 'radash';
import { useEffect, useMemo, useState } from 'react';

export default function CurrentWeather() {
  const { data: weatherData } = useWeatherData();
  const [rain, setRain] = useState('Uppehåll');

  const description = capitalize(
    weatherData.current.weather[0].description
  );

  const weatherIcon = useMemo(
    () =>
      getWeatherIconUrl(
        weatherData.current.weather[0].id,
        weatherData.current.weather[0].icon,
        weatherData.daily[0].moon_phase
      ),
    [weatherData]
  );

  useEffect(() => {
    let newRain = 'Uppehåll';

    if (weatherData.current.rain) {
      newRain = weatherData.current.rain['1h'] + ' mm/h';
    } else if (weatherData.current.snow) {
      newRain = weatherData.current.snow['1h'] + ' mm/h';
    }

    setRain(newRain);
  }, [weatherData]);

  return (
    <Group gap="md">
      <Image
        src={weatherIcon}
        width="80px"
        height="80px"
        alt="Väder"
      />
      <Stack align="center">
        <Text className="outline-lg" lineClamp={2}>
          {description}
        </Text>
        <Text className="outline-md">{rain}</Text>
      </Stack>
    </Group>
  );
}
