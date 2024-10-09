import { Button, VisuallyHidden } from '@mantine/core';
import { TbMap2 } from 'react-icons/tb';

export default function OpenMapButton({ openMap }) {
  return (
    <Button
      variant="subtle"
      fz={36}
      px={0}
      c="crimson"
      onClick={openMap}
    >
      <TbMap2 />
      <VisuallyHidden>Öppna karta</VisuallyHidden>
    </Button>
  );
}
