import { Container } from '@mantine/core';
import { useLogger } from '@mantine/hooks';
import { useBackgroundStyle } from '../hooks/useBackgroundStyle.js';

export default function Background({ children }) {
  const backgroundStyle = useBackgroundStyle();

  useLogger('Background', [{ backgroundStyle }]);

  return (
    <Container
      className="weather-background"
      fluid
      style={backgroundStyle}
      aria-label={'Bakgrundsbild'}
    >
      {children}
    </Container>
  );
}
