import {
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from '@mantine/core';

export default function Forecast() {
  return (
    <Paper
      bg="rgba(74, 127, 169, 0.8)"
      radius="md"
      shadow="lg"
      miw="12vw"
      mih="12vh"
    >
      <Stack align="center" justify="space-around" gap={4} my={4}>
        <Text className="outline-sm">Idag 12:34</Text>
        <Center>
          <Group gap="sm" justify="center">
            <Image
              src="/weather_icons/PNG/128/night_full_moon_partial_cloud.png"
              width="46px"
              height="46px"
              alt="Halvklart"
            />
            <Text className="outline-temp-sm">-23.0&deg;C</Text>
          </Group>
        </Center>
        <Text className="outline-sm" c="paleturquoise">
          2.3 mm
        </Text>
      </Stack>
    </Paper>
  );
}
