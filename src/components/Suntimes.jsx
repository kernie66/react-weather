import { Divider, Group, Image, Stack, Text } from '@mantine/core';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import dayjs from 'dayjs';
import { getClipArtUrl } from '../helpers/getImageUrl.js';

export function Suntimes() {
  const { data: currentWeather } = useCurrentWeather();
  const sunriseTime = dayjs
    .unix(currentWeather?.sunrise)
    .format('HH:DD');
  const sunsetTime = dayjs
    .unix(currentWeather?.sunset)
    .format('HH:DD');

  return (
    <Stack gap={8}>
      <Group gap={8} pb={4}>
        <Image
          src={getClipArtUrl('sunrise-clipart-lg.png')}
          w={56}
          h={32}
          alt="Sunrise"
        />
        <Text pt={6} className="outline-md">
          {sunriseTime}
        </Text>
      </Group>
      <Divider />
      <Group gap={8} my={0} pt={0}>
        <Image
          src={getClipArtUrl('sunset-clipart-lg.png')}
          w={56}
          h={32}
          alt="Sunset"
        />
        <Text pt={6} className="outline-md">
          {sunsetTime}
        </Text>
      </Group>
    </Stack>
  );
}
