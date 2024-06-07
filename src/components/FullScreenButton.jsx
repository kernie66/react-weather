import { FaExpand } from 'react-icons/fa';
import { Button } from 'reactstrap';

export default function FullScreenButton({ onClick }) {
  const buttonStyle = {
    boxShadow: 'none',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    color: 'dodgerblue',
    fontSize: 32,
    padding: 0,
    margin: 0,
    marginTop: -4,
  };

  return (
    <Button
      className="FullScreenButton"
      style={buttonStyle}
      onClick={onClick}
    >
      <FaExpand />
    </Button>
  );
}
