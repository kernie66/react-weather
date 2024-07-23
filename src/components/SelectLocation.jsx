import { TbHomeCheck } from 'react-icons/tb';
import { GiPositionMarker } from 'react-icons/gi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
  Autocomplete,
  Button,
  CloseButton,
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
import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { select } from 'radash';

export default function SelectLocation({ modal, closeModal }) {
  const { setLocation, getLocation, getHistory } = useLocation();
  const { setMapLocation, getMapLocation } = useMapLocation();
  const queryClient = useQueryClient();
  const [historyValue, setHistoryValue] = useState('');

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

  const restorePosition = () => {
    setMapLocation(getLocation);
    setHistoryValue('');
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

  const onChangeHandler = (value) => {
    setHistoryValue(value);
  };

  const selectHistory = (selection) => {
    console.log('Selected history:', selection);
    const historyLocation = select(
      getHistory,
      (h) => h,
      (h) => h.address === selection
    );
    setMapLocation(historyLocation[0]);
    setHistoryValue('');
    console.log('History location:', historyLocation[0]);
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
                      placeholder="Välj plats från historiken"
                      value={historyValue}
                      data={getHistory.map(
                        (history) => history.address
                      )}
                      comboboxProps={{ withinPortal: false }}
                      dropdownOpened
                      onChange={onChangeHandler}
                      onOptionSubmit={selectHistory}
                      rightSection={
                        historyValue !== '' && (
                          <CloseButton
                            icon={<FiDelete size={20} />}
                            onClick={() => setHistoryValue('')}
                            aria-label="Clear value"
                          />
                        )
                      }
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
