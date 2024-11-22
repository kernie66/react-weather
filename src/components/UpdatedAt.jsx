import { Group, Text } from '@mantine/core';
import classes from '../css/Text.module.css';
import { useCurrentWeather } from '../hooks/weatherQueries.js';
import * as dayjs from 'dayjs';
import { useNetwork } from '@mantine/hooks';

export default function UpdatedAt() {
  const { data: currentWeather } = useCurrentWeather();
  const networkStatus = useNetwork();

  const updatedAt = dayjs.unix(currentWeather?.dt).format('LLLL');
  const textColor = networkStatus.online ? 'yellow.3' : 'red.3';

  return (
    <Group justify="center" gap="xs" mt="sm">
      <Text c={textColor} className={classes.outlineSingle}>
        Uppdaterad:
      </Text>
      <Text span c="gray.0" className={classes.outlineSingle}>
        {updatedAt}
      </Text>
    </Group>
  );
}
