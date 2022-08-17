import { Col, Container, Row } from "reactstrap";
import ErrorBoundary from "./ErrorBoundary";
import FlipDisplay from "./FlipDisplay";
import FullScreenCheck from "./FullScreenCheck";

export default function Body() {
  const backgroundStyle = {
    backgroundImage: "url(/img/weather/clear_day.jpg)"
  };

  return (
    <Container fluid style={backgroundStyle} className="pt-3">
      <Row>
        <Col xs="auto">
          <Row>
            <ErrorBoundary>
              <FullScreenCheck />
            </ErrorBoundary>
          </Row>
          <p>Col 1</p>
        </Col>
        <Col xs="auto" className="ms-auto me-auto">
          <Row>
            <span className="text-center outline-lg">Weather Station</span>
          </Row>
          <Row>
            <Col>
              <p>Temperatur</p>
            </Col>
            <Col>
              <p>Min/Max</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <ErrorBoundary>
                <FlipDisplay />
              </ErrorBoundary>
            </Col>
            <Col>
              <p>Väderbild</p>
            </Col>
          </Row>
        </Col>
        <Col xs="auto">
          <p>Col 3</p>
        </Col>
      </Row>
      <Row>
        <p>Väderprognos</p>
      </Row>
    </Container>
  );
};