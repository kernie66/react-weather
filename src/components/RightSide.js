import { Container, List } from 'reactstrap';

export default function RightSide() {
  return (
    <Container className="d-flex flex-column justify-content-around h-100 p-0">
      <List type="unstyled" className="outline-md text-end">
        <li className="outline-sm border-bottom">Molntäcke</li>
        <li className="pe-1 pt-1">80%</li>
      </List>
      <List type="unstyled" className="outline-md text-end">
        <li className="outline-sm border-bottom">Känns som</li>
        <li className="pe-1 pt-1">27&deg;C</li>
      </List>
      <List type="unstyled" className="outline-md text-end">
        <li className="outline-sm border-bottom pt-4">Vindbyar</li>
        <li className="pe-1 pt-1">4 m/s</li>
      </List>
    </Container>
  );
};