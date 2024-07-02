import { useCurrentWeather } from '../utils/weatherQueries.js';
import { Suntimes } from './Suntimes';
import { Divider, Stack, Text } from '@mantine/core';

export default function LeftSide() {
  const { data: currentWeather } = useCurrentWeather();

  return (
    <Stack h="50vh" justify="space-around" gap="md">
      <Suntimes />
      <Stack gap={4}>
        <Text className="outline-sm">Luftfuktighet</Text>
        <Divider />
        <Text className="outline-md">
          {currentWeather?.humidity}%
        </Text>
      </Stack>
      <Stack gap={4}>
        <Text className="outline-sm">Vind</Text>
        <Divider />
        <Text className="outline-md">
          {currentWeather?.wind_speed.toFixed(1)} m/s
        </Text>
        <Text className="outline-md">NNV</Text>
      </Stack>
    </Stack>
  );
}
