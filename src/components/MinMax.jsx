import { Divider, Stack } from '@mantine/core';
import TemperatureValue from './TemperatureValue.jsx';

const minMaxFontSize = 48;

export default function MinMax() {
  return (
    <Stack justify="center" gap={0}>
      <TemperatureValue tempValue={6.8} fontSize={minMaxFontSize} />
      <Divider size="md" />
      <TemperatureValue tempValue={5.3} fontSize={minMaxFontSize} />
    </Stack>
  );
}
