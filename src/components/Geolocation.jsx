import { Group, Text } from '@mantine/core';
import { useGeolocation } from '../hooks/useGeolocation.js';

export default function Geolocation() {
  const { latitude, longitude } = useGeolocation();

  return (
    <Group>
      <Text fz={16} c="blue">
        Latitude: {latitude}
      </Text>
      <Text fz={16} c="blue">
        Longitude: {longitude}
      </Text>
    </Group>
  );
}
