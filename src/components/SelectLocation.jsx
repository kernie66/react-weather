import { TbHomeCheck } from 'react-icons/tb';
import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
  Autocomplete,
  Button,
  Group,
  Modal,
  Popover,
  Text,
  rem,
} from '@mantine/core';
import {
  defaultAddress,
  defaultPosition,
  useLocation,
} from '../contexts/LocationProvider';
import Map from './Map';
import { useQueryClient } from '@tanstack/react-query';
import { TbCheck } from 'react-icons/tb';
import { showNotification } from '@mantine/notifications';
import { useMapLocation } from '../contexts/MapLocationProvider.jsx';

export default function SelectLocation({ modal, closeModal }) {
  const { setLocation } = useLocation();
  const { getMapLocation } = useMapLocation();
  const queryClient = useQueryClient();

  const selectPosition = () => {
    setLocation(getMapLocation);
    queryClient.invalidateQueries({ queryKey: ['weatherData'] });
    showNotification({
      title: 'Väderposition uppdaterad',
      message: getMapLocation.address,
      color: 'green',
      icon: <TbCheck style={{ width: rem(18), height: rem(18) }} />,
      autoClose: 5000,
    });
    closeModal();
  };

  const setDefaultPosition = () => {
    setLocation({
      address: defaultAddress,
      position: defaultPosition,
    });
    queryClient.invalidateQueries({ queryKey: ['weatherData'] });
    showNotification({
      title: 'Väderposition satt till hemadressen',
      message: defaultAddress, // 'Välkommen hem',
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
            <Group>
              <Text fw={500} fz="h3">
                Ange adress för väder :&nbsp;&nbsp;
                <Popover
                  width={300}
                  position="bottom"
                  withArrow
                  shadow="md"
                >
                  <Popover.Target>
                    <Button variant="light" px="sm">
                      <Text span c="dodgerblue" fw={500} fz="h3">
                        {getMapLocation.address}
                      </Text>
                    </Button>
                  </Popover.Target>
                  <Popover.Dropdown>
                    <Autocomplete
                      label="Your favorite library"
                      placeholder="Pick value or enter anything"
                      data={['React', 'Angular', 'Vue', 'Svelte']}
                      comboboxProps={{ withinPortal: false }}
                    />
                  </Popover.Dropdown>
                </Popover>
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
              <Button
                variant="outline"
                ms={40}
                fz={18}
                px={8}
                py={2}
                rightSection={<TbHomeCheck size={18} />}
                onClick={setDefaultPosition}
              >
                Hem
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
