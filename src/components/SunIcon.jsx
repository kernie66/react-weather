import { Group, Image, Text } from '@mantine/core';
import { getClipArtUrl } from '../helpers/getImageUrl.js';
import classes from '../css/Text.module.css';

export default function SunIcon({
  isSunset = false,
  sunTime = '00:00',
}) {
  const event = isSunset ? 'sunset' : 'sunrise';
  const imageUrl = getClipArtUrl(`${event}-clipart-lg.png`);

  return (
    <Group gap={8} justify="space-between" pb={4}>
      <Image src={imageUrl} w={56} h={32} alt={event} />
      <Text
        pt={6}
        ta="right"
        fw={500}
        fz={24}
        c="orange.4"
        className={classes.outlineSingle}
      >
        {sunTime}
      </Text>
    </Group>
  );
}
