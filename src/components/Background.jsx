import { Container } from '@mantine/core';
import { useLogger, useViewportSize } from '@mantine/hooks';
import { useImageSize } from 'react-image-size';
import { getWeatherImageUrl } from '../helpers/getImageUrl.js';
import { useAtomValue } from 'jotai';
import { backgroundImageState } from '../atoms/weatherThemeStates.js';

export default function Background({ children }) {
  const backgroundImage = useAtomValue(backgroundImageState);
  const screenSize = useViewportSize();

  useLogger('Background', [{ backgroundImage }]);

  // Change image handling based on aspect ratios
  const getBackgroundSize = (imgSize, scrSize) => {
    let newBgSize = 'cover';

    if (imgSize) {
      const imageAspect = imgSize.width / imgSize.height;
      const screenAspect = scrSize.width / scrSize.height;
      const ratio = imageAspect / screenAspect;

      if (ratio > 1.1) {
        newBgSize = 'auto 100%';
      } else if (ratio < 0.8) {
        newBgSize = '100% auto';
      }
    }
    return newBgSize;
  };

  const backgroundImageUrl = getWeatherImageUrl(
    `${backgroundImage}.jpg`
  );
  const [dimensions] = useImageSize(backgroundImageUrl);
  const backgroundSize = getBackgroundSize(dimensions, screenSize);
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: backgroundSize,
    backgroundRepeat: 'no-repeat',
    // width: '100vw',
    height: '100vh',
  };

  return (
    <Container fluid style={backgroundStyle}>
      {children}
    </Container>
  );
}
