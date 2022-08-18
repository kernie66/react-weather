import { List } from "reactstrap";

export default function Temperature() {
  return (
    <List type="unstyled" className="text-bottom outline-temp font-weight-bold border pe-4">
      <li>
        <span>-24</span
        ><span style={{ fontSize: "75%" }}>.8&deg;C</span>
      </li>
    </List>
  );
};