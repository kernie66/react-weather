import Temperature from './Temperature';
import MinMax from './MinMax';
import ErrorBoundary from './ErrorBoundary';
import { Grid } from '@mantine/core';

export default function TemperatureDisplay() {
  return (
    <Grid justify="center" mt={20} style={{ color: 'sandybrown' }}>
      <ErrorBoundary>
        <Grid.Col span={6} mt={-20} me={20}>
          <Temperature />
        </Grid.Col>
      </ErrorBoundary>
      <ErrorBoundary>
        <Grid.Col span="content">
          <MinMax />
        </Grid.Col>
      </ErrorBoundary>
    </Grid>
  );
}
