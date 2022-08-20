import { List } from 'reactstrap';

export default function RightSide() {
  return (
    <List type="unstyled" className="outline-md text-end">
      <li className="outline-sm border-bottom">Molntäcke</li>
      <li className="pe-1 pb-4">80%</li>
      <li className="outline-sm border-bottom pt-5">Känns som</li>
      <li className="pe-1 pb-4">27&deg;C</li>
      <li className="outline-sm border-bottom pt-4">Vindbyar</li>
      <li className="pe-1">4 m/s</li>
    </List>
  );
};