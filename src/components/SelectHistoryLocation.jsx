import {
  Autocomplete,
  Button,
  CloseButton,
  Popover,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { select } from 'radash';
import { FiDelete } from 'react-icons/fi';
import { useClickOutside, useForceUpdate } from '@mantine/hooks';
import classes from '../css/Text.module.css';
import useLocation from '../hooks/useLocation.js';
import useMapLocation from '../hooks/useMapLocation.js';

export default function SelectHistoryLocation({
  popover,
  toggle,
  buttonProps = { size: 'sm', variant: 'light', px: 'sm' },
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
    console.debug('Clicked outside');
    toggle();
  };
  useClickOutside(handleClickOutside, null, [target, dropdown]);

  const onChangeHandler = (value) => {
    setHistoryValue(value);
  };

  const selectHistory = (selection) => {
    const historyLocation = select(
      getHistory,
      (h) => h,
      (h) => h.address === selection
    );
    setMapLocation(historyLocation[0]);
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
    console.debug('History input cleared');
  };

  return (
    <Popover
      width={300}
      opened={popover}
      onOpen={() => setHistoryValue('')}
      trapFocus
      position="bottom"
      withArrow
      shadow="md"
    >
      <Popover.Target ref={setTarget}>
        <Button
          size={buttonProps.size}
          variant={buttonProps.variant}
          px={buttonProps.px}
          maw={buttonProps.width}
          style={{ verticalAlign: 'baseline' }}
          onClick={toggle}
          justify="space-between"
          rightSection={<span />}
        >
          <Text
            span
            maw={buttonProps.width - buttonProps.px * 2}
            ta="left"
            className={textClass}
            lineClamp={1}
          >
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
