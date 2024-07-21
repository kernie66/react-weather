import { TbMap2 } from 'react-icons/tb';
import SelectLocation from './SelectLocation';
import { useLocation } from '../contexts/LocationProvider';
import FullScreenButton from './FullScreenButton.jsx';
import { Box, Button, Center, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MapLocationProvider from '../contexts/MapLocationProvider.jsx';

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const { getAddress } = useLocation();

  return (
    <>
      <MapLocationProvider>
        <SelectLocation modal={opened} closeModal={close} />
      </MapLocationProvider>
      <Group justify="space-between">
        <FullScreenButton />
        <Box w="75vw">
          <Center>
            <Text xs="10" className="outline-lg" lineClamp={1}>
              Väderstation:&nbsp;{getAddress.toString()}
            </Text>
          </Center>
        </Box>
        <Button variant="transparent" onClick={open}>
          <TbMap2 size={36} color="crimson" />
        </Button>
      </Group>
    </>
  );
}
