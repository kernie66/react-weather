import { Suntimes } from './Suntimes';
import { Divider, Stack, Text } from '@mantine/core';

export default function LeftSide() {
  return (
    <Stack h="50vh" justify="space-around" gap="md">
      <Suntimes />
      <Stack gap={4}>
        <Text className="outline-sm">Luftfuktighet</Text>
        <Divider />
        <Text className="outline-md">66%</Text>
      </Stack>
      <Stack gap={4}>
        <Text className="outline-sm">Vind</Text>
        <Divider />
        <Text className="outline-md">12.0 m/s</Text>
        <Text className="outline-md">NNV</Text>
      </Stack>
    </Stack>
  );
}
