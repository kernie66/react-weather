import {
  Autocomplete,
  Button,
  CloseButton,
  Popover,
  Text,
} from '@mantine/core';
import { useLocation } from '../contexts/LocationProvider.jsx';
import { useMapLocation } from '../contexts/MapLocationProvider.jsx';
import { useEffect, useState } from 'react';
import { select } from 'radash';
import { FiDelete } from 'react-icons/fi';
import { useClickOutside, useForceUpdate } from '@mantine/hooks';
import classes from '../css/Text.module.css';

export default function SelectHistoryLocation({
  popover,
  toggle,
  buttonSize = 'sm',
  textClass = classes.historyButton,
  closeOnSelect = false,
}) {
  const { getLocation, getHistory } = useLocation();
  const { setMapLocation, getMapLocation } = useMapLocation();
  const [historyValue, setHistoryValue] = useState('');
  const [shownLocation, setShownLocation] = useState(false);
  const [target, setTarget] = useState(null);
  const [dropdown, setDropdown] = useState(null);
  const forceUpdate = useForceUpdate();

  const handleClickOutside = () => {
    console.log('Clicked outside');
    setHistoryValue('');
    forceUpdate();
    toggle();
  };
  useClickOutside(handleClickOutside, null, [target, dropdown]);

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
    console.log('History location:', historyLocation[0]);
    if (closeOnSelect) {
      forceUpdate();
      toggle();
    }
  };

  useEffect(() => {
    let newShownLocation = getMapLocation.address;
    setShownLocation(newShownLocation);
  }, [getMapLocation]);

  /*
  useEffect(() => {
    console.log('History value:', historyValue);
  }, [historyValue]);
  */

  const clearHistoryInput = () => {
    setHistoryValue('');
    setMapLocation(getLocation);
    console.log('History input cleared');
  };

  return (
    <Popover
      width={300}
      opened={popover}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target ref={setTarget}>
        <Button
          size={buttonSize}
          variant="light"
          px="sm"
          style={{ verticalAlign: 'baseline' }}
          onClick={toggle}
        >
          <Text span className={textClass}>
            {shownLocation}
          </Text>
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={setDropdown}>
        <Autocomplete
          placeholder="Välj plats från historiken"
          value={historyValue}
          data={getHistory
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
      </Popover.Dropdown>
    </Popover>
  );
}
