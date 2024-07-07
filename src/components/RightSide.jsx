import { Divider, Group, Stack, Text } from '@mantine/core';
import {
  useCurrentWeather,
  useHourlyWeather,
} from '../utils/weatherQueries.js';
import { useEffect, useState } from 'react';

export default function RightSide() {
  const { data: currentWeather } = useCurrentWeather();
  const { data: hourlyWeather } = useHourlyWeather();
  const [windGust, setWindGust] = useState(0);

  useEffect(() => {
    let newWindGust = currentWeather?.wind_speed;
    try {
      if (currentWeather?.wind_gust) {
        newWindGust = currentWeather.wind_gust;
      } else if (hourlyWeather[0]?.wind_gust) {
        newWindGust = hourlyWeather[0].wind_gust;
      }
    } finally {
      setWindGust(newWindGust);
    }
  }, [currentWeather, hourlyWeather]);

  return (
    <Stack h="100%" justify="space-around" gap="md">
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text className="outline-sm">Molntäcke</Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text className="outline-md">
            {currentWeather?.clouds}%
          </Text>
        </Group>
      </Stack>
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text className="outline-sm">Känns som</Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text className="outline-md">
            {currentWeather?.feels_like.toFixed(1)}&deg;C
          </Text>
        </Group>
      </Stack>
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text className="outline-sm">Vindbyar</Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text className="outline-md">
            {windGust.toFixed(1)} m/s
          </Text>
        </Group>
      </Stack>
    </Stack>
  );
}
