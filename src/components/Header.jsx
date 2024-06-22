import { TbMap2 } from 'react-icons/tb';
import { useState } from 'react';
import SelectLocation from './SelectLocation';
import { useAddress } from '../contexts/AddressProvider';
import FullScreenButton from './FullScreenButton.jsx';
import { Button, Center, Group, Text } from '@mantine/core';

export default function Header() {
  const [modal, setModal] = useState(false);
  const { getAddress } = useAddress();

  const selectAddress = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <SelectLocation modal={modal} closeModal={closeModal} />
      <Group justify="space-between">
        <FullScreenButton />
        <Center>
          <Text xs="10" className="outline-lg">
            Väderstation :&nbsp;{getAddress.toString()}
          </Text>
        </Center>
        <Button variant="transparent" onClick={selectAddress}>
          <TbMap2 size={36} color="crimson" />
        </Button>
      </Group>
    </>
  );
}
