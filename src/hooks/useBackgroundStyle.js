import { useAtomValue } from 'jotai';
import { backgroundImageState } from '../atoms/weatherThemeStates.js';
import { getWeatherImageUrl } from '../helpers/getImageUrl.js';
import { useImageSize } from 'react-image-size';
import { useViewportSize } from '@mantine/hooks';
import { getBackgroundSizeStyle } from '../helpers/getBackgroundSizeStyle.js';

export const useBackgroundStyle = () => {
  const backgroundImage = useAtomValue(backgroundImageState);

  const backgroundImageUrl = getWeatherImageUrl(
    `${backgroundImage}.jpg`
  );
  const [dimensions] = useImageSize(backgroundImageUrl);
  const screenSize = useViewportSize();
  const backgroundSize = getBackgroundSizeStyle(
    dimensions,
    screenSize
  );
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: backgroundSize,
    backgroundRepeat: 'no-repeat',
    // width: '100vw',
    height: '100vh',
  };
  return backgroundStyle;
};
