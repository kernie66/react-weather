import { Divider, Group, Image, Stack, Text } from '@mantine/core';

export function Suntimes() {
  return (
    <Stack gap={8}>
      <Group gap={8} pb={4}>
        <Image
          src="/img/icons/sunrise-clipart-lg.png"
          w={56}
          h={32}
          alt="Sunrise"
        />
        <Text pt={6} className="outline-md">
          05:30
        </Text>
      </Group>
      <Divider />
      <Group gap={8} my={0} pt={0}>
        <Image
          src="img/icons/sunset-clipart-lg.png"
          w={56}
          h={32}
          alt="Sunset"
        />
        <Text pt={6} className="outline-md">
          21:34
        </Text>
      </Group>
    </Stack>
  );
}
