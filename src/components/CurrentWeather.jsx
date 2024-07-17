import { Group, Image, Stack, Text } from '@mantine/core';
import { getWeatherIconUrl } from '../helpers/getImageUrl.js';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import { capitalize } from 'radash';
import { useEffect, useMemo, useState } from 'react';

export default function CurrentWeather() {
  const { data: currentWeather } = useCurrentWeather();
  const [rain, setRain] = useState('Uppehåll');

  const description = capitalize(
    currentWeather.weather[0].description
  );

  const weatherIcon = useMemo(
    () =>
      getWeatherIconUrl(
        currentWeather.weather[0].id,
        currentWeather.weather[0].icon,
        currentWeather.moonPhase
      ),
    [currentWeather]
  );

  useEffect(() => {
    let newRain = 'Uppehåll';

    if (currentWeather.rain) {
      newRain = currentWeather.rain['1h'] + ' mm/h';
    } else if (currentWeather.snow) {
      newRain = currentWeather.snow['1h'] + ' mm/h';
    }

    setRain(newRain);
  }, [currentWeather]);

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
