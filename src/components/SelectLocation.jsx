import { TbHomeCheck } from 'react-icons/tb';
import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, Group, Modal, Text, rem } from '@mantine/core';
import Map from './Map';
import { useQueryClient } from '@tanstack/react-query';
import { TbCheck } from 'react-icons/tb';
import { showNotification } from '@mantine/notifications';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import {
  currentLocationState,
  defaultAddress,
  defaultPosition,
  mapLocationState,
} from '../atoms/locationStates.js';

export default function SelectLocation({ modal, closeModal }) {
  const [currentLocation, setCurrentLocation] = useAtom(
    currentLocationState
  );
  const [mapLocation, setMapLocation] = useAtom(mapLocationState);
  const queryClient = useQueryClient();
  const [
    addressInputOpened,
    { open: openAddressInput, close: closeAddressInput },
  ] = useDisclosure(false);
  const [historyOpened, { toggle: toggleHistory }] =
    useDisclosure(false);
  const [disableMouseEvents, setDisableMouseEvents] = useState(false);

  useEffect(() => {
    let disable = false;
    if (historyOpened) {
      disable = true;
    }
    if (addressInputOpened) {
      disable = true;
    }
    setDisableMouseEvents(disable);
  }, [historyOpened, addressInputOpened]);

  const selectPosition = () => {
    setCurrentLocation(mapLocation);
    queryClient.invalidateQueries({ queryKey: ['weatherData'] });
    showNotification({
      title: 'Väderposition uppdaterad',
      message: mapLocation.address,
      color: 'green',
      icon: <TbCheck style={{ width: rem(18), height: rem(18) }} />,
      autoClose: 5000,
    });
    closeModal();
  };

  const restorePosition = () => {
    setMapLocation(currentLocation);
    closeModal();
  };

  const setDefaultPosition = () => {
    setCurrentLocation({
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
      onClose={restorePosition}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            <Group>
              <Text fw={500} fz="h3">
                Ange adress för väder :&nbsp;&nbsp;
                <SelectHistoryLocation
                  popover={historyOpened}
                  toggle={toggleHistory}
                />
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
          <Map
            addressOpened={addressInputOpened}
            openAddress={openAddressInput}
            closeAddress={closeAddressInput}
            disableMouseEvents={disableMouseEvents}
          />
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
