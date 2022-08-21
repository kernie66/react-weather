import { Col, Container, Row } from "reactstrap";
import CurrentWeather from "./CurrentWeather";
import ErrorBoundary from "./ErrorBoundary";
import FlipDisplay from "./FlipDisplay";
import Forecasts from "./Forecasts";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import TemperatureDisplay from "./TemperatureDisplay";

export default function Body() {
  return (
    <Container fluid className="d-flex flex-column p-0 m-0" style={{ height: "80vh" }}>
      <Row className="justify-content-between w-100 m-0 mb-3" style={{ height: "55%" }}>
        <Col xs="auto">
          <ErrorBoundary>
            <LeftSide />
          </ErrorBoundary>
        </Col>
        <Col xs="auto" className="flex-grow-1">
          <Container className="d-flex flex-column justify-content-around h-100 p-0">
            <Row className="m-0">
              <TemperatureDisplay />
            </Row>
            <Row>
              <Container className="d-flex justify-content-evenly m-0">
                <Col xs="auto">
                  <ErrorBoundary>
                    <FlipDisplay />
                  </ErrorBoundary>
                </Col>
                <Col xs="auto">
                  <ErrorBoundary>
                    <CurrentWeather />
                  </ErrorBoundary>
                </Col>
              </Container>
            </Row>
          </Container>
        </Col>
        <Col xs="auto">
          <ErrorBoundary>
            <RightSide />
          </ErrorBoundary>
        </Col>
      </Row>
      <Row>
        <Container className="d-flex flex-wrap justify-content-between" style={{ width: "90%" }}>
          <ErrorBoundary>
            <Forecasts />
          </ErrorBoundary>
        </Container>
      </Row>
    </Container>
  );
};