import { useEffect } from "react";
import { Container } from "reactstrap";
import FlipTime from "./components/FlipTime";
import WebFont from "webfontloader";
import { EventCountdown } from "./components/EventCountdown";
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
        <FlipTime value={"70"} />
      </ErrorBoundary>
      <ErrorBoundary>
        <EventCountdown value="2023-01-01T00:00:00+01:00" />
      </ErrorBoundary>
      <ErrorBoundary>
        <FlipDate />
      </ErrorBoundary>
    </Container>
  );
};