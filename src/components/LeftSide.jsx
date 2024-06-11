import { Divider, Group, Image, Stack, Text } from '@mantine/core';
import { List } from 'reactstrap';

export default function LeftSide() {
  return (
    <Stack justify="space-around" gap="md">
      <Stack gap={8}>
        <Group gap={8}>
          <Image
            src="/img/weather/sunrise-clipart-lg.png"
            w={56}
            h={32}
            alt="Sunrise"
          />
          <Text pt={6} className="outline-md">
            05:30
          </Text>
        </Group>
        <Divider />
        <Group gap={8} my={0}>
          <Image
            src="img/weather/sunset-clipart-lg.png"
            w={56}
            h={32}
            alt="Sunset"
          />
          <Text pt={6} className="outline-md">
            21:34
          </Text>
        </Group>
      </Stack>
      <List type="unstyled" className="outline-md">
        <li className="outline-sm border-bottom">Luftfuktighet</li>
        <li className="ps-1 pt-1">66%</li>
      </List>
      <List type="unstyled" className="outline-md">
        <li className="outline-sm border-bottom">Vind</li>
        <li className="ps-1 pt-1">12.0 m/s</li>
        <li className="ps-1 pt-1">NNV</li>
      </List>
    </Stack>
  );
}
