import { useEffect } from "react";
import { Container } from "reactstrap";
import WebFont from "webfontloader";
import ErrorBoundary from "./components/ErrorBoundary";
import FlipDate from "./components/FlipDate";

export default function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Azeret Mono']
      }
    });
  }, []);

  return (
    <Container>
      <span className="outline-lg">Weather Station</span>
      <ErrorBoundary>
        <FlipDate />
      </ErrorBoundary>
    </Container>
  );
};