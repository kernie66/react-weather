import { useEffect, useRef, useState } from "react";
import { Button, Container } from "reactstrap";
import WebFont from "webfontloader";
import FullScreen, { fullScreenSupported } from "react-request-fullscreen";
import Body from "./components/Body";
import ClearDay from "./img/clear_day.jpg";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const fullScreenRef = useRef();
  //  let fullScreenRef
  const [isFullScreen, setIsFullScreen] = useState(false);
  const backgroundImage = ClearDay;
  const background = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: 'center',
    backgroundSize: 'center',
    backgroundRepeat: 'no-repeat',
    //    width: '100vw',
    height: '100vh'
  };

  // Load fonts used in the app
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Azeret Mono']
      }
    });
  }, []);

  const onFullScreenChange = () => {
    setIsFullScreen(!isFullScreen);
  };

  const requestOrExitFullScreen = () => {
    console.log('Fullscreen button pressed');
    fullScreenRef.current.fullScreen();
  };

//  <p>Browser support fullscreen feature: {`${fullScreenSupported()}`}</p>
//  <p>Browser is fullscreen: {`${isFullScreen}`}</p>

  return (
    <Container fluid style={background}>
      <FullScreen ref={fullScreenRef} onFullScreenChange={onFullScreenChange}>
        {fullScreenSupported() &&
          <Button onClick={requestOrExitFullScreen}>
            Fullscreen
          </Button>
        }
      </FullScreen>
      <ErrorBoundary>
        <Body />
      </ErrorBoundary>
    </Container>
  );
};