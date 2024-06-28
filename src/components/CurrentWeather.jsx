import { Group, Image, Stack, Text } from '@mantine/core';
import { getLargeWeatherIconUrl } from '../helpers/getImageUrl.js';

export default function CurrentWeather() {
  return (
    <Group gap="md" maw="55%">
      <Image
        src={getLargeWeatherIconUrl('day_partial_cloud')}
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
