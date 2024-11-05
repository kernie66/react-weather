import { Divider, Stack, Text } from '@mantine/core';
import * as Compass from 'cardinal-direction';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';
import classes from '../css/Text.module.css';
import { useCurrentWeather } from '../hooks/weatherQueries.js';

export default function WindSpeed() {
  const infoColor = useAtomValue(infoColorState);
  const { data: currentWeather } = useCurrentWeather();

  const windDir = Compass.cardinalFromDegree(
    currentWeather?.wind_deg,
    Compass.CardinalSubset.Intercardinal
  );

  const seWindDir = windDir.replaceAll('W', 'V').replaceAll('E', 'Ö');

  return (
    <Stack gap={4}>
      <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
        Vind
      </Text>
      <Divider />
      <Text fz={24} c={infoColor} className={classes.outlineSingle}>
        {currentWeather?.wind_speed.toFixed(1)} m/s
      </Text>
      <Text fz={24} c={infoColor} className={classes.outlineSingle}>
        {seWindDir}
      </Text>
    </Stack>
  );
}
