import { useEffect } from "react";
import WebFont from "webfontloader";
import Background from "./components/Background";
import Body from "./components/Body";
import ErrorBoundary from "./components/ErrorBoundary";
import Header from "./components/Header";

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
    <Background>
      <Header />
      <ErrorBoundary>
        <Body />
      </ErrorBoundary>
      <span className="text-center">Botten av sidan</span>
    </Background>
  );
};