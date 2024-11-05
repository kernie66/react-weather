import { TbHomeCheck } from 'react-icons/tb';
import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Button, Group, Modal, Text, rem } from '@mantine/core';
// import Map from './Map';
import { useQueryClient } from '@tanstack/react-query';
import { TbCheck } from 'react-icons/tb';
import { showNotification } from '@mantine/notifications';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';
import { lazy, Suspense } from 'react';
import { useAtom } from 'jotai';
import {
  currentLocationState,
  defaultAddress,
  defaultPosition,
  historyLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';
import { mapHistoryToggleState } from '../atoms/toggleStates.js';
import { replaceOrAppend } from 'radash';

const Map = lazy(() => import('./Map.jsx'));

export default function SelectMapLocation({ modal, closeModal }) {
  const [currentLocation, setCurrentLocation] = useAtom(
    currentLocationState
  );
  const [mapLocation, setMapLocation] = useAtom(mapLocationState);
  const [historyLocations, setHistoryLocations] = useAtom(
    historyLocationState
  );
  const queryClient = useQueryClient();
  const [mapHistoryOpened, toggleMapHistory] = useAtom(
    mapHistoryToggleState
  );

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
    if (mapLocation.address !== defaultAddress) {
      const newHistory = replaceOrAppend(
        historyLocations,
        mapLocation,
        (loc) => loc.address === mapLocation.address
      );
      setHistoryLocations(newHistory);
    }
    closeModal();
  };

  const restorePosition = () => {
    setMapLocation(currentLocation);
    closeModal();
  };

  const setDefaultPosition = () => {
    setMapLocation({
      address: defaultAddress,
      position: defaultPosition,
    });
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
                  popover={mapHistoryOpened}
                  toggle={toggleMapHistory}
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
            icon={<AiOutlineCloseCircle size={40} />}
            aria-label="Stäng karta"
          />
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<div>Laddar kartan...</div>}>
            <Map />
          </Suspense>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
}
