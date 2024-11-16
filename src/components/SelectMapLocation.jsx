import { Button, Group, Modal, Text } from '@mantine/core';
import { useAtom, useAtomValue } from 'jotai';
import { replaceOrAppend } from 'radash';
import { lazy, Suspense } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GiPositionMarker } from 'react-icons/gi';
import { TbHomeCheck } from 'react-icons/tb';
import {
  currentLocationState,
  defaultAddress,
  defaultPosition,
  historyLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';
import { mapHistoryToggleState } from '../atoms/toggleStates.js';
import { useSetLocation } from '../hooks/useSetLocation.jsx';
import CurrentPosition from './CurrentPosition.jsx';
import SelectHistoryLocation from './SelectHistoryLocation.jsx';

const Map = lazy(() => import('./Map.jsx'));

export default function SelectMapLocation({ modal, closeModal }) {
  const currentLocation = useAtomValue(currentLocationState);
  const [mapLocation, setMapLocation] = useAtom(mapLocationState);
  const [historyLocations, setHistoryLocations] = useAtom(
    historyLocationState
  );
  const [mapHistoryOpened, toggleMapHistory] = useAtom(
    mapHistoryToggleState
  );
  const { setLocation } = useSetLocation();

  const selectPosition = (newLocation) => {
    let selectedLocation = mapLocation;

    // Check if a new location is sent as parameter, and not a click object
    if ('address' in newLocation && 'position' in newLocation) {
      selectedLocation = newLocation;
    }
    setLocation(selectedLocation);
    if (selectedLocation.address !== defaultAddress) {
      const newHistory = replaceOrAppend(
        historyLocations,
        selectedLocation,
        (loc) => loc.address === selectedLocation.address
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
    setLocation({
      address: defaultAddress,
      position: defaultPosition,
    });
    closeModal();
  };

  // Remove parameter from click callback
  const togglePopover = () => {
    toggleMapHistory();
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
                  toggle={togglePopover}
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
              <CurrentPosition selectPosition={selectPosition} />
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
