import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useImageSize } from 'react-image-size';
import { getWeatherImageUrl } from '../helpers/getImageUrl.js';
import { useAddress } from '../contexts/AddressProvider.jsx';
import { useCurrentWeather } from '../utils/weatherQueries.js';
import { getBackgroundImage } from '../helpers/getBackgroundImage.js';

export default function Background({ children }) {
  const [backgroundImage, setBackgroundImage] = useState('clear_day');
  const [backgroundSize, setBackgroundSize] = useState('cover');
  const backgroundImageUrl = getWeatherImageUrl(
    `${backgroundImage}.jpg`
  );
  const { width, height } = useViewportSize();
  const [dimensions] = useImageSize(backgroundImageUrl);
  const { getPosition } = useAddress();
  const { data: currentWeather } = useCurrentWeather();

  const background = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: backgroundSize,
    backgroundRepeat: 'no-repeat',
    // width: '100vw',
    height: '100vh',
  };

  // Change image handling based on aspect ratios
  useEffect(() => {
    let newBgSize = 'cover';

    if (dimensions) {
      const imageAspect = dimensions.width / dimensions.height;
      const screenAspect = width / height;
      const ratio = imageAspect / screenAspect;

      if (ratio > 1.1) {
        newBgSize = 'auto 100%';
      } else if (ratio < 0.8) {
        newBgSize = '100% auto';
      }
    }
    setBackgroundSize(newBgSize);
  }, [dimensions, width, height, setBackgroundSize]);

  useEffect(() => {
    const newBackground = getBackgroundImage(
      currentWeather,
      getPosition
    );
    setBackgroundImage(newBackground.image);
  }, [currentWeather, getPosition]);

  return (
    <Container fluid style={background}>
      {children}
    </Container>
  );
}
