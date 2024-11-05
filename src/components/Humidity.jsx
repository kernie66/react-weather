import { Divider, Group, Stack, Text } from '@mantine/core';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';
import { useCurrentWeather } from '../hooks/weatherQueries.js';

export default function Humidity({ rightSide }) {
  const infoColor = useAtomValue(infoColorState);
  const { data: currentWeather } = useCurrentWeather();

  const justifyText = rightSide ? 'flex-end' : 'flex-start';

  return (
    <Stack gap={4}>
      <Group justify={justifyText}>
        <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
          Luftfuktighet
        </Text>
      </Group>
      <Divider />
      <Group justify={justifyText}>
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {currentWeather?.humidity}%
        </Text>
      </Group>
    </Stack>
  );
}
