import { Col, Container, Row } from "reactstrap";
import ErrorBoundary from "./ErrorBoundary";
import FlipDisplay from "./FlipDisplay";
import LeftSide from "./LeftSide";
import MinMax from "./MinMax";
import RightSide from "./RightSide";
import Temperature from "./Temperature";

export default function Body() {
  return (
    <Container fluid className="pt-1" style={{ height: "80vh" }}>
      <Row>
        <Col xs="auto">
          <ErrorBoundary>
            <LeftSide />
          </ErrorBoundary>
        </Col>
        <Col xs="auto" className="ms-auto me-auto">
            <Row>
              <Col>
                <ErrorBoundary>
                  <Temperature />
                </ErrorBoundary>
              </Col>
              <Col>
                <MinMax />
              </Col>
            </Row>
          <Container className="justify-content-center border">
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
          </Container>
        </Col>
        <Col xs="auto">
          <RightSide />
        </Col>
      </Row>
      <Row>
        <p>Väderprognos</p>
      </Row>
    </Container>
  );
};