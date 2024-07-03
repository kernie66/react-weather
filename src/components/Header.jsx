import { TbMap2 } from 'react-icons/tb';
import SelectLocation from './SelectLocation';
import { useAddress } from '../contexts/AddressProvider';
import FullScreenButton from './FullScreenButton.jsx';
import { Box, Button, Center, Group, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

export default function Header() {
  const [opened, { open, close }] = useDisclosure(false);
  const { getAddress } = useAddress();

  return (
    <>
      <SelectLocation modal={opened} closeModal={close} />
      <Group justify="space-between">
        <FullScreenButton />
        <Box w="75vw">
          <Center>
            <Text xs="10" className="outline-lg" lineClamp={1}>
              Väderstation :&nbsp;{getAddress.toString()}
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
