import { Group, Text } from '@mantine/core';
import classes from '../css/Text.module.css';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import * as dayjs from 'dayjs';

export default function UpdatedAt() {
  const { data: currentWeather } = useCurrentWeather();

  const updatedAt = dayjs.unix(currentWeather?.dt).format('LLLL');

  return (
    <Group justify="center" gap="xs" mt="sm">
      <Text c="yellow.3" className={classes.outlineSm}>
        Uppdaterad:
      </Text>
      <Text span c="gray.0" className={classes.outlineSm}>
        {updatedAt}
      </Text>
    </Group>
  );
}