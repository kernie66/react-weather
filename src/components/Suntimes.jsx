import { Divider, Group, Image, Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import { getClipArtUrl } from '../helpers/getImageUrl.js';
import { useWeatherPosition } from '../utils/weatherQueries.js';
import { getSunTimes } from '../helpers/getSunInfo.js';
import classes from '../css/Text.module.css';

export default function SunTimes() {
  const { data: position } = useWeatherPosition();

  const { sunriseTime, sunsetTime, afterSunrise } = getSunTimes(
    dayjs(),
    position
  ); // dayjs(sunTimes.sunrise).format('HH:mm');

  const Sunrise = () => {
    return (
      <Group gap={8} justify="space-between" pb={4}>
        <Image
          src={getClipArtUrl('sunrise-clipart-lg.png')}
          w={56}
          h={32}
          alt="Sunrise"
        />
        <Text
          pt={6}
          ta="right"
          fw={500}
          fz={24}
          c="orange.4"
          className={classes.outlineSingle}
        >
          {sunriseTime}
        </Text>
      </Group>
    );
  };

  const Sunset = () => {
    return (
      <Group gap={8} justify="space-between" my={0} pt={0}>
        <Image
          src={getClipArtUrl('sunset-clipart-lg.png')}
          w={56}
          h={32}
          alt="Sunset"
        />
        <Text
          pt={6}
          ta="right"
          fw={500}
          fz={24}
          c="orange.4"
          className={classes.outlineSingle}
        >
          {sunsetTime}
        </Text>
      </Group>
    );
  };
  return (
    <Stack gap={8}>
      {afterSunrise ? <Sunset /> : <Sunrise />}
      <Divider />
      {afterSunrise ? <Sunrise /> : <Sunset />}
    </Stack>
  );
}
