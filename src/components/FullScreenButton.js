import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { Button } from "reactstrap";

export default function FullScreenButton({ onClick }) {
  return(
      <Button color="secondary" className="FullScreenButton" onClick={onClick}>
        <FontAwesomeIcon icon={solid('expand')} className="fs-3 p-0" />
      </Button>
  );
}