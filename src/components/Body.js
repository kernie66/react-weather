import { Col, Container, Row } from "reactstrap";
import ErrorBoundary from "./ErrorBoundary";
import FlipDisplay from "./FlipDisplay";
import LeftSide from "./LeftSide";
import MinMax from "./MinMax";
import RightSide from "./RightSide";
import Temperature from "./Temperature";

export default function Body() {
  return (
    <Container fluid className="d-flex flex-column p-0 m-0" style={{ height: "80vh" }}>
      <Row className="justify-content-between w-100 m-0" style={{ height: "65%" }}>
        <Col xs="auto">
          <ErrorBoundary>
            <LeftSide />
          </ErrorBoundary>
        </Col>
        <Col xs="auto" className="flex-grow-1">
          <Container className="d-flex flex-column justify-content-around h-100 p-0">
            <Row className="m-0">
              <Container className="d-flex justify-content-evenly m-0">
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
            </Row>
            <Row>
              <Container className="d-flex justify-content-evenly m-0">
                <Col>
                  <ErrorBoundary>
                    <FlipDisplay />
                  </ErrorBoundary>
                </Col>
                <Col>
                  <ErrorBoundary>
                    <p>Väderbild</p>
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
        <Container className="d-flex justify-content-evenly m-0">
          <ErrorBoundary>
            <p>Väderprognos 1</p>
            <p>Väderprognos 2</p>
            <p>Väderprognos 3</p>
          </ErrorBoundary>
        </Container>
      </Row>
    </Container>
  );
};