import { Autocomplete, CloseButton, rem } from '@mantine/core';
import { useState } from 'react';
import { isEmpty, select } from 'radash';
import { FiDelete } from 'react-icons/fi';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  currentLocationState,
  historyLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';
import { useQueryClient } from '@tanstack/react-query';
import { showNotification } from '@mantine/notifications';
import { TbCheck } from 'react-icons/tb';

export default function HistorySelector({
  toggle,
  closeOnSelect = false,
}) {
  const [currentLocation, setCurrentLocation] = useAtom(
    currentLocationState
  );
  const historyLocations = useAtomValue(historyLocationState);
  const setMapLocation = useSetAtom(mapLocationState);
  const [historyValue, setHistoryValue] = useState('');
  const queryClient = useQueryClient();

  const onChangeHandler = (value) => {
    setHistoryValue(value);
  };

  const setLocation = (newLocation) => {
    console.log('setLocation called with:', newLocation.address);
    setCurrentLocation(newLocation);
    queryClient.invalidateQueries({ queryKey: ['weatherData'] });
    showNotification({
      id: 'weatherUpdate',
      title: 'Väderposition uppdaterad',
      message: newLocation.address,
      color: 'green',
      icon: <TbCheck style={{ width: rem(18), height: rem(18) }} />,
      autoClose: 5000,
      closeButtonProps: { 'aria-label': 'Stäng notis' },
    });
  };

  const selectHistory = (selection) => {
    console.log('selectHistory called with selection:', selection);
    let historyLocation = currentLocation;
    if (selection !== 'Ingen historik') {
      const newHistoryLocation = select(
        historyLocations,
        (h) => h,
        (h) => h.address === selection
      );
      historyLocation = newHistoryLocation[0];
    }
    console.log('historyLocation', historyLocation);
    setMapLocation(historyLocation);
    if (closeOnSelect) {
      setLocation(historyLocation);
      toggle();
    }
  };

  const clearHistoryInput = () => {
    setHistoryValue('');
    setMapLocation(currentLocation);
    console.debug('History input cleared');
  };

  const historyData = !isEmpty(historyLocations)
    ? historyLocations?.toReversed().map((history) => history.address)
    : ['Ingen historik'];

  return (
    <Autocomplete
      name="selectHistory"
      aria-label="Indatafält för historik"
      placeholder="Välj plats från historiken"
      value={historyValue}
      data={historyData}
      dropdownOpened
      data-autofocus
      selectFirstOptionOnChange
      onChange={onChangeHandler}
      onOptionSubmit={selectHistory}
      comboboxProps={{ withinPortal: false, shadow: 'md' }}
      rightSection={
        historyValue !== '' && (
          <CloseButton
            icon={<FiDelete size={20} />}
            onClick={clearHistoryInput}
            aria-label="Clear value"
          />
        )
      }
    />
  );
}
