import { useRef, useState } from "react";
import FullScreen, { fullScreenSupported } from "react-request-fullscreen";
import FullScreenButton from "./FullScreenButton";

export default function FullScreenCheck() {
  const fullScreenRef = useRef();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const onFullScreenChange = () => {
    setIsFullScreen(!isFullScreen);
  };

  const requestOrExitFullScreen = () => {
    fullScreenRef.current.fullScreen();
  };

  //  <p>Browser support fullscreen feature: {`${fullScreenSupported()}`}</p>
  //  <p>Browser is fullscreen: {`${isFullScreen}`}</p>

  return (
    <FullScreen ref={fullScreenRef} onFullScreenChange={onFullScreenChange}>
      {fullScreenSupported() & !isFullScreen &&
        <FullScreenButton onClick={requestOrExitFullScreen} />
      }
    </FullScreen>
  );
};