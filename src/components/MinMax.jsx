import { Divider, Stack } from '@mantine/core';
import TemperatureValue from './TemperatureValue.jsx';
import { useTodaysWeather } from '../utils/weatherQueries.js';

const minMaxFontSize = 48;

export default function MinMax() {
  const { data: today } = useTodaysWeather();

  return (
    <Stack justify="center" gap={0}>
      <TemperatureValue
        tempValue={today?.temp.max}
        fontSize={minMaxFontSize}
      />
      <Divider size="md" />
      <TemperatureValue
        tempValue={today?.temp.min}
        fontSize={minMaxFontSize}
      />
    </Stack>
  );
}
