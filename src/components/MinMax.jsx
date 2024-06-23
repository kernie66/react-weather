import { Divider, Stack } from '@mantine/core';
import TemperatureValue from './TemperatureValue.jsx';

export default function MinMax() {
  return (
    <Stack justify="center" gap={0}>
      <TemperatureValue
        tempValue={6.8}
        fontWeight={400}
        tempClass="outline-temp-md"
      />
      <Divider size="md" />
      <TemperatureValue
        tempValue={5.3}
        fontWeight={400}
        tempClass="outline-temp-md"
      />
    </Stack>
  );
}
