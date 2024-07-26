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
import { useClickOutside } from '@mantine/hooks';
import classes from '../css/Text.module.css';

export default function SelectHistoryLocation({
  popover,
  toggle,
  buttonSize = 'sm',
  textClass = classes.historyButton,
  showHistoryLocation = true,
}) {
  const { getLocation, getHistory } = useLocation();
  const { setMapLocation, getMapLocation } = useMapLocation();
  const [historyValue, setHistoryValue] = useState('');
  const [shownLocation, setShownLocation] = useState(false);

  const handleClickOutside = () => {
    console.log('Clicked outside');
    setHistoryValue('');
    toggle();
  };
  const ref = useClickOutside(handleClickOutside);

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

  useEffect(() => {
    let newShownLocation = getMapLocation.address;
    if (!showHistoryLocation) {
      newShownLocation = getLocation.address;
    }
    setShownLocation(newShownLocation);
  }, [showHistoryLocation, getLocation, getMapLocation]);

  return (
    <Popover
      width={300}
      opened={popover}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target>
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
      <Popover.Dropdown ref={ref}>
        <Autocomplete
          placeholder="Välj plats från historiken"
          value={historyValue}
          data={getHistory.map((history) => history.address)}
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
                onClick={() => setHistoryValue('')}
                aria-label="Clear value"
              />
            )
          }
        />
      </Popover.Dropdown>
    </Popover>
  );
}
