import { Container, List } from "reactstrap";

export default function LeftSide() {
  return (
    <Container className="d-flex flex-column justify-content-between h-100 pt-3 px-0">
      <List type="unstyled" className="outline-md">
        <li className="border-bottom pb-2">
          <img src="img/weather/sunrise-clipart-lg.png"
            width="56px" height="32px" alt="Sunrise" />
          <span className="align-bottom ps-2">05:30</span>
        </li>
        <li className="pt-1">
          <img src="img/weather/sunset-clipart-lg.png"
            width="56px" height="32px" alt="Sunset" />
          <span className="align-bottom ps-2">20:30</span>
        </li>
      </List>
      <List type="unstyled" className="outline-md">
        <li className="outline-sm border-bottom">Luftfuktighet</li>
        <li className="ps-1 pt-1">66%</li>
      </List>
      <List type="unstyled" className="outline-md">
        <li className="outline-sm border-bottom">Vind</li>
        <li className="ps-1 pt-1">12.0 m/s</li>
        <li className="ps-1 pt-1">NNV</li>
      </List>
    </Container>
  );
};
