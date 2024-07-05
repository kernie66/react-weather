import { Divider, Group, Stack, Text } from '@mantine/core';

export default function RightSide() {
  return (
    <Stack h="100%" justify="space-around" gap="md">
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text className="outline-sm">Molntäcke</Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text className="outline-md">80%</Text>
        </Group>
      </Stack>
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text className="outline-sm">Känns som</Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text className="outline-md">27&deg;C</Text>
        </Group>
      </Stack>
      <Stack gap={4}>
        <Group justify="flex-end">
          <Text className="outline-sm">Vindbyar</Text>
        </Group>
        <Divider />
        <Group justify="flex-end">
          <Text className="outline-md">4 m/s</Text>
        </Group>
      </Stack>
    </Stack>
  );
}
