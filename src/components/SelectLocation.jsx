import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, Group, Modal, Text, rem } from '@mantine/core';
import { useAddress } from '../contexts/AddressProvider';
import Map from './Map';
import { useQueryClient } from '@tanstack/react-query';
import { TbCheck } from 'react-icons/tb';
import { showNotification } from '@mantine/notifications';

export default function SelectLocation({ modal, closeModal }) {
  const { getAddress } = useAddress();
  const queryClient = useQueryClient();

  const selectPosition = () => {
    queryClient.invalidateQueries({ queryKey: ['weatherData'] });
    showNotification({
      title: 'Väderposition uppdaterad',
      message: getAddress,
      color: 'green',
      icon: <TbCheck style={{ width: rem(18), height: rem(18) }} />,
      autoClose: 5000,
    });

    closeModal();
  };

  return (
    <Modal.Root
      fullScreen
      opened={modal}
      onClose={closeModal}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Group justify="space-between">
              <Text fw={500} fz="h3">
                Ange adress för väder :&nbsp;&nbsp;
                <Text span c="dodgerblue" fw={500} fz="h3">
                  {getAddress}
                </Text>
              </Text>
              <Button
                variant="outline"
                ms={20}
                fz={18}
                px={8}
                py={2}
                rightSection={<GiPositionMarker size={18} />}
                onClick={selectPosition}
              >
                Välj
              </Button>
            </Group>
          </Modal.Title>
          <Modal.CloseButton
            icon={<AiOutlineCloseCircle size={32} />}
          />
        </Modal.Header>
        <Modal.Body>
          <Map />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
