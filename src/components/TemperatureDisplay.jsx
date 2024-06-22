import Temperature from './Temperature';
import MinMax from './MinMax';
import ErrorBoundary from './ErrorBoundary';
import { Group } from '@mantine/core';

export default function TemperatureDisplay() {
  return (
    <Group
      justify="flex-end"
      gap="10%"
      me="15%"
      style={{ color: 'sandybrown' }}
    >
      <ErrorBoundary>
        <Temperature />
      </ErrorBoundary>
      <ErrorBoundary>
        <MinMax />
      </ErrorBoundary>
    </Group>
  );
}
