import { Autocomplete, CloseButton } from '@mantine/core';
import { useState } from 'react';
import { select } from 'radash';
import { FiDelete } from 'react-icons/fi';
import { useForceUpdate } from '@mantine/hooks';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  currentLocationState,
  historyLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';

export default function HistorySelector({
  toggle,
  closeOnSelect = false,
}) {
  const currentLocation = useAtomValue(currentLocationState);
  const historyLocations = useAtomValue(historyLocationState);
  const setMapLocation = useSetAtom(mapLocationState);
  const [historyValue, setHistoryValue] = useState('');
  const forceUpdate = useForceUpdate();

  const onChangeHandler = (value) => {
    setHistoryValue(value);
  };

  const selectHistory = (selection) => {
    const historyLocation = select(
      historyLocations,
      (h) => h,
      (h) => h.address === selection
    );
    setMapLocation(historyLocation[0]);
    if (closeOnSelect) {
      forceUpdate();
      toggle();
    }
  };

  const clearHistoryInput = () => {
    setHistoryValue('');
    setMapLocation(currentLocation);
    console.debug('History input cleared');
  };

  return (
    <Autocomplete
      placeholder="Välj plats från historiken"
      value={historyValue}
      data={historyLocations
        .toReversed()
        .map((history) => history.address)}
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
