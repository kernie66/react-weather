import { List } from "reactstrap";

export default function LeftSide() {
  return (
    <List type="unstyled" className="outline-md">
      <li className="border-bottom outline-sm">Solen</li>
      <li className="pb-2 pt-2">
        <img src="img/weather/sunrise-clipart-lg.png"
          width="56px" height="32px" alt="Sunrise" />
        <span className="align-bottom ps-2">05:30</span>
      </li>
      <li>
        <img src="img/weather/sunset-clipart-lg.png"
          width="56px" height="32px" alt="Sunset" />
        <span className="align-bottom ps-2">20:30</span>
      </li>
      <li className="outline-sm border-bottom pt-5">Luftfuktighet</li>
      <li className="ps-1 pt-1">66%</li>
      <li className="outline-sm border-bottom pt-5">Vind</li>
      <li className="ps-1 pt-1">12.0 m/s</li>
      <li className="ps-1 pt-1">NNV</li>
    </List>
  );
};
