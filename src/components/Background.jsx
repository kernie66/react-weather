import { useEffect, useState } from 'react';
import { Container } from '@mantine/core';

export default function Background({ children }) {
  const [backgroundImage, setBackgroundImage] = useState('clear_day');
  const backgroundImageUrl =
    'img/weather/' + backgroundImage + '.jpg';

  const background = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'center',
    backgroundRepeat: 'no-repeat',
    // width: '100vw',
    height: '100vh',
  };

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
