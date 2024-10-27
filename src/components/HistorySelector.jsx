import { Autocomplete, CloseButton } from '@mantine/core';
import { useState } from 'react';
import { isEmpty, select } from 'radash';
import { FiDelete } from 'react-icons/fi';
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

  const onChangeHandler = (value) => {
    setHistoryValue(value);
  };

  const selectHistory = (selection) => {
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
