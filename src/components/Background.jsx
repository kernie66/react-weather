import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useImageSize } from 'react-image-size';

export default function Background({ children }) {
  const [backgroundImage, setBackgroundImage] = useState('clear_day');
  const [backgroundSize, setBackgroundSize] = useState('cover');
  const backgroundImageUrl =
    '/img/weather/' + backgroundImage + '.jpg';
  const { width, height } = useViewportSize();
  const [dimensions] = useImageSize(backgroundImageUrl);

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

  // Set up a timer
  useEffect(() => {
    const timerId = setInterval(() => {
      const newBackground =
        backgroundImage === 'night_galaxy'
          ? 'clear_day'
          : 'night_galaxy';
      setBackgroundImage(newBackground);
    }, 10000);

    return () => clearInterval(timerId);
  }, [backgroundImage]);

  return (
    <Container fluid style={background}>
      {children}
    </Container>
  );
}
