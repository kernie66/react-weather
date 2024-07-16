import { Divider, Group, Image, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { getClipArtUrl } from '../helpers/getImageUrl.js';
import SunCalc from 'suncalc';
import { useWeatherPosition } from '../utils/weatherQueries.js';

export function SunTimes() {
  const { data: position } = useWeatherPosition();

  const sunTimes = SunCalc.getTimes(
    dayjs().toDate(),
    position.lat,
    position.lon
  );

  const sunriseTime = dayjs(sunTimes.sunrise).format('HH:mm');
  const sunsetTime = dayjs(sunTimes.sunset).format('HH:mm');

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
