import { Autocomplete, CloseButton } from '@mantine/core';
import { useState } from 'react';
import { isEmpty } from 'radash';
import { FiDelete } from 'react-icons/fi';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  currentLocationState,
  historyLocationState,
  mapLocationState,
} from '../atoms/locationStates.js';
import { useSelectHistory } from '../hooks/useSelectHistory.jsx';

export default function HistorySelector({
  toggle,
  closeOnSelect = false,
}) {
  const currentLocation = useAtomValue(currentLocationState);
  const historyLocations = useAtomValue(historyLocationState);
  const setMapLocation = useSetAtom(mapLocationState);
  const [historyValue, setHistoryValue] = useState('');
  const { selectHistory } = useSelectHistory();
  const onChangeHandler = (value) => {
    setHistoryValue(value);
  };

  const submitHistory = (selection) => {
    selectHistory(selection, closeOnSelect ? toggle : null);
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
      data-testid="history"
      selectFirstOptionOnChange
      onChange={onChangeHandler}
      onOptionSubmit={submitHistory}
      comboboxProps={{ withinPortal: false, shadow: 'md' }}
      rightSection={
        historyValue !== '' && (
          <CloseButton
            icon={<FiDelete size={20} />}
            onClick={clearHistoryInput}
            aria-label="Radera inmatning"
          />
        )
      }
    />
  );
}
