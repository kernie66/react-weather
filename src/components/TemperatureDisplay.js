import Temperature from './Temperature';
import MinMax from './MinMax';
import { Col, Container } from 'reactstrap';
import ErrorBoundary from './ErrorBoundary';

export default function TemperatureDisplay() {
  return (
    <Container className="d-flex justify-content-evenly m-0" style={{ color: "sandybrown" }}>
      <Col xs="auto">
        <ErrorBoundary>
          <Temperature />
        </ErrorBoundary>
      </Col>
      <Col xs="auto">
        <ErrorBoundary>
          <MinMax />
        </ErrorBoundary>
      </Col>
    </Container>
  );
};