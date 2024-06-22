import { FaCompress, FaExpand } from 'react-icons/fa';
import { Button } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';

export default function FullScreenButton({ onClick }) {
  const { toggle, fullscreen } = useFullscreen();

  const buttonStyle = {
    boxShadow: 'none',
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    color: 'grey',
    fontSize: 36,
    padding: 0,
    margin: 0,
    marginTop: 4,
  };

  return (
    <Button
      ps={8}
      className="FullScreenButton"
      style={buttonStyle}
      onClick={toggle}
    >
      {fullscreen ? <FaCompress /> : <FaExpand />}
    </Button>
  );
}
