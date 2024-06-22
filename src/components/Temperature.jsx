import { Text } from '@mantine/core';

export default function Temperature() {
  return (
    <Text fw={500} className="outline-temp">
      -24
      <span fw={500} style={{ fontSize: '75%' }}>
        .8&deg;C
      </span>
    </Text>
  );
}
