import { List } from "reactstrap";

export default function Temperature() {
  return (
    <List type="unstyled" className="outline-temp font-weight-bold">
      <li>
        <span>-24</span
        ><span style={{ fontSize: "75%" }}>.8&deg;C</span>
      </li>
    </List>
  );
};