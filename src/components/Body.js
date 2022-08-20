import { Col, Container, Row } from "reactstrap";
import ErrorBoundary from "./ErrorBoundary";
import FlipDisplay from "./FlipDisplay";
import LeftSide from "./LeftSide";
import MinMax from "./MinMax";
import RightSide from "./RightSide";
import Temperature from "./Temperature";

export default function Body() {
  return (
    <Container fluid className="d-flex flex-column p-0 m-0 border" style={{ height: "80vh" }}>
      <Row className="justify-content-between w-100 m-0 border" style={{ height: "65%" }}>
        <Col xs="auto">
          <ErrorBoundary>
            <LeftSide />
          </ErrorBoundary>
        </Col>
        <Col xs="auto" className="flex-grow-1">
          <Container className="d-flex flex-column justify-content-around h-100 p-0 bg-primary">
            <Row className="d-flex m-0">
              <Container className="d-flex justify-content-between m-0 bg-info">
                <Col className="bg-danger">
                  <ErrorBoundary>
                    <Temperature />
                  </ErrorBoundary>
                </Col>
                <Col xs="auto" className="border">
                  <MinMax />
                </Col>
              </Container>
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