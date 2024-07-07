import { Divider, Group, Stack, Text } from '@mantine/core';
import { useWeatherData } from '../utils/weatherQueries.js';
import { useEffect, useState } from 'react';

export default function RightSide() {
  const { data: weatherData } = useWeatherData();
  const [windGust, setWindGust] = useState(0);

  useEffect(() => {
    let newWindGust = weatherData?.current.wind_speed;

    if (weatherData) {
      if (weatherData.current.wind_gust) {
        newWindGust = weatherData.current.wind_gust;
      } else if (weatherData.hourly[0].wind_gust) {
        newWindGust = weatherData.hourly[0].wind_gust;
      }
    }

    setWindGust(newWindGust);
  }, [weatherData]);

  return (
    <Stack h="100%" justify="space-around" gap="md">
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text className="outline-sm">Molntäcke</Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text className="outline-md">
            {weatherData?.current.clouds}%
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
            {weatherData?.current.feels_like.toFixed(1)}&deg;C
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
