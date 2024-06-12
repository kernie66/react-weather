import { Group, Image, Stack, Text } from '@mantine/core';

export default function CurrentWeather() {
  return (
    <Group gap="md">
      <Image
        src="/weather_icons/PNG/256/day_partial_cloud.png"
        width="100px"
        height="100px"
        alt="Väder"
      />
      <Stack align="center">
        <Text className="outline-lg">Växlande molnighet</Text>
        <Text className="outline-md">Uppehåll</Text>
      </Stack>
    </Group>
  );
}
