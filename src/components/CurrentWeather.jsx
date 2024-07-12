import { Group, Image, Stack, Text } from '@mantine/core';
import { getWeatherIconUrl } from '../helpers/getImageUrl.js';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import { capitalize } from 'radash';
import { useEffect, useMemo, useState } from 'react';

export default function CurrentWeather() {
  const { data: current } = useCurrentWeather();
  const [rain, setRain] = useState('Uppehåll');

  const description = capitalize(current.weather[0].description);

  const weatherIcon = useMemo(
    () =>
      getWeatherIconUrl(
        current.weather[0].id,
        current.weather[0].icon,
        current.moonPhase
      ),
    [current]
  );

  useEffect(() => {
    let newRain = 'Uppehåll';

    if (current.rain) {
      newRain = current.rain['1h'] + ' mm/h';
    } else if (current.snow) {
      newRain = current.snow['1h'] + ' mm/h';
    }

    setRain(newRain);
  }, [current]);

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
