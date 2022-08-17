import { Col, Container, Row } from "reactstrap";
import ErrorBoundary from "./ErrorBoundary";
import FlipDisplay from "./FlipDisplay";

export default function Body() {
  return (
    <Container fluid className="pt-1">
      <Row>
        <Col xs="auto">
          <p>Col 1</p>
        </Col>
        <Col xs="auto" className="ms-auto me-auto">
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