import { useEffect, useState } from 'react';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import { Suntimes } from './Suntimes';
import { Divider, Stack, Text } from '@mantine/core';
import * as Compass from 'cardinal-direction';

export default function LeftSide() {
  const { data: currentWeather } = useCurrentWeather();
  const [windDir, setWindDir] = useState('N');

  useEffect(() => {
    let newWindDir = Compass.cardinalFromDegree(
      currentWeather?.wind_deg,
      Compass.CardinalSubset.InterCardinal
    );
    setWindDir(newWindDir);
  }, [currentWeather]);

  return (
    <Stack h="100%" justify="space-around" gap="md">
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
        <Text className="outline-md">{windDir}</Text>
      </Stack>
    </Stack>
  );
}
