import { useRef } from "react";
import FullScreen, { fullScreenSupported } from "react-request-fullscreen";
import FullScreenButton from "./FullScreenButton";

export default function FullScreenCheck({ isFullScreen, onFullScreenChange }) {
  const fullScreenRef = useRef();

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