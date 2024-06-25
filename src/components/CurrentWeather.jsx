import { Group, Image, Stack, Text } from '@mantine/core';

export default function CurrentWeather() {
  return (
    <Group gap="md" maw="55%">
      <Image
        src="/weather_icons/PNG/256/day_partial_cloud.png"
        width="80px"
        height="80px"
        alt="Väder"
      />
      <Stack align="center">
        <Text className="outline-lg">Växlande molnighet</Text>
        <Text className="outline-md">Uppehåll</Text>
      </Stack>
    </Group>
  );
}
