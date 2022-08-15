import { Col, Container, Row } from "reactstrap";
import ErrorBoundary from "./ErrorBoundary";
import FlipDate from "./FlipDate";

export default function Body() {
  const background = {
    backgroundImage: "url(/img/weather/clear_day.jpg)"
  };

  return (
    <Container fluid style={background}>
      <Row>
        <Col xs="auto">
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
                <FlipDate />
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