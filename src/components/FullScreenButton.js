import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"
import { Button } from "reactstrap";

export default function FullScreenButton({ onClick }) {
  const buttonStyle = {
    boxShadow: "none",
    borderColor: "transparent",
    backgroundColor: "transparent",
    color: "dodgerblue",
    fontSize: 36,
    padding: 0,
    margin: 0,
    marginTop: -24,
  };

  return(
      <Button 
        className="FullScreenButton" 
        style={buttonStyle}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={solid('expand')} />
      </Button>
  );
}