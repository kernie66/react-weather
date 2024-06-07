import { Col, Container, Row } from "reactstrap";

export default function CurrentWeather() {
  return (
    <Container className="d-flex justify-content-around m-0">
      <Row>
        <Col xs="auto" className="p-0 m-0">
          <img src="weather_icons/PNG/256/day_partial_cloud.png" width="100px" height="100px" alt="Väder" />
        </Col>
        <Col xs="auto">
          <Row>
            <Col className="outline-lg text-center">
              Växlande molnighet
            </Col>
          </Row>
          <Row>
            <Col className="outline-md text-center fs-2 pb-2">
              Uppehåll
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

  )
}