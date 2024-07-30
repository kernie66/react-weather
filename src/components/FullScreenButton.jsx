import { FaCompress, FaExpand } from 'react-icons/fa';
import { Button } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';

export default function FullScreenButton({ onClick }) {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <Button
      px={0}
      variant="subtle"
      fz={36}
      c="teal"
      className="FullScreenButton"
      onClick={toggle}
    >
      {fullscreen ? <FaCompress /> : <FaExpand />}
    </Button>
  );
}
