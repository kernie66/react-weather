import { Divider, Group, Stack, Text } from '@mantine/core';
import * as Compass from 'cardinal-direction';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';
import classes from '../css/Text.module.css';
import { useCurrentWeather } from '../hooks/weatherQueries.js';

export default function WindSpeed({ rightSide }) {
  const infoColor = useAtomValue(infoColorState);
  const { data: currentWeather } = useCurrentWeather();

  const justifyText = rightSide ? 'flex-end' : 'flex-start';

  const windDir = Compass.cardinalFromDegree(
    currentWeather?.wind_deg,
    Compass.CardinalSubset.Intercardinal
  );

  const seWindDir = windDir.replaceAll('W', 'V').replaceAll('E', 'Ö');

  return (
    <Stack gap={4}>
      <Group justify={justifyText}>
        <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
          Vind
        </Text>
      </Group>
      <Divider />
      <Group justify={justifyText}>
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {currentWeather?.wind_speed.toFixed(1)} m/s
        </Text>
      </Group>
      <Group justify={justifyText}>
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {seWindDir}
        </Text>
      </Group>
    </Stack>
  );
}
