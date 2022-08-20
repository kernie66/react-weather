import { Col, Container, Row } from "reactstrap";

export default function Playground() {
  return (
    <Container className="d-flex flex-column h-100 justify-content-between border" >
      <div className="">
        Row 1
      </div>
      <Row>
        <Col>
        Row 2
        </Col>
      </Row>
      <div className="">
        Row 3
      </div>
    </Container>
  );
};