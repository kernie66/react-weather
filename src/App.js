import { useEffect } from "react";
import WebFont from "webfontloader";
import Background from "./components/Background";
import Body from "./components/Body";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";
import DeviceOrientation, { Orientation } from "react-screen-orientation";

export default function App() {

  // Load fonts used in the app
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Azeret Mono']
      }
    });
  }, []);

  return (
    <DeviceOrientation lockOrientation={'landscape'}>
      {/* Will only be in DOM in landscape */}
      <Orientation orientation='landscape' alwaysRender={false}>
        <ErrorBoundary>
          <Background>
            <Header />
            <ErrorBoundary>
              <Body />
            </ErrorBoundary>
          </Background>
        </ErrorBoundary>
      </Orientation>
      {/* Will stay in DOM, but is only visible in portrait */}
      <Orientation orientation='portrait'>
        <Background>
          <div>
            <p className="text-info text-center fs-4">Please rotate your device</p>
          </div>
        </Background>
      </Orientation>
    </DeviceOrientation>

  );
};