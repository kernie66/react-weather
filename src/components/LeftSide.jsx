import { useEffect, useState } from 'react';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import SunTimes from './SunTimes.jsx';
import { Divider, Stack, Text } from '@mantine/core';
import * as Compass from 'cardinal-direction';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import { infoColorState } from '../atoms/weatherThemeStates.js';

export default function LeftSide() {
  const infoColor = useAtomValue(infoColorState);
  const { data: currentWeather } = useCurrentWeather();
  const [windDir, setWindDir] = useState('N');

  useEffect(() => {
    let newWindDir = Compass.cardinalFromDegree(
      currentWeather?.wind_deg,
      Compass.CardinalSubset.Intercardinal
    );
    setWindDir(newWindDir);
  }, [currentWeather]);

  return (
    <Stack h="100%" justify="space-between" gap="md">
      <SunTimes />
      <Stack gap={4}>
        <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
          Luftfuktighet
        </Text>
        <Divider />
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {currentWeather?.humidity}%
        </Text>
      </Stack>
      <Stack gap={4}>
        <Text fz={18} c="indigo.1" className={classes.outlineSingle}>
          Vind
        </Text>
        <Divider />
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {currentWeather?.wind_speed.toFixed(1)} m/s
        </Text>
        <Text fz={24} c={infoColor} className={classes.outlineSingle}>
          {windDir}
        </Text>
      </Stack>
    </Stack>
  );
}
