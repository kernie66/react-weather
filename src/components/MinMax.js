import { List } from "reactstrap";

export default function MinMax() {
  return (
    <List type="unstyled" className="outline-temp-md text-right font-weight-bold pt-3">
      <li className="border-bottom border-temp">
        26<span style={{ fontSize: "80%" }}
        >.7&deg;C</span>
      </li>
      <li className="pt-1">
        15<span style={{ fontSize: "80%" }}
        >.4&deg;C</span>
      </li>
    </List>
  );
};