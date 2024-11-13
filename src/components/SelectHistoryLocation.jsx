import { Button, Popover, Text, VisuallyHidden } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { currentLocationState } from '../atoms/locationStates.js';
import classes from '../css/Text.module.css';
import HistorySelector from './HistorySelector.jsx';
// import { nanoid } from 'nanoid';

// const refID = nanoid(10);

export default function SelectHistoryLocation({
  popover,
  toggle,
  buttonProps = { size: 'sm', variant: 'light', px: 'sm' },
  textClass = classes.historyButton,
  closeOnSelect = false,
}) {
  const currentLocation = useAtomValue(currentLocationState);
  const [target, setTarget] = useState(null);
  const [dropdown, setDropdown] = useState(null);

  // const keyID = useId(refID);

  const handleClickOutside = () => {
    console.debug('Clicked outside');
    toggle();
  };
  useClickOutside(handleClickOutside, null, [target, dropdown]);

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
            {currentLocation.address}
          </Text>
          <VisuallyHidden>Historik</VisuallyHidden>
        </Button>
      </Popover.Target>
      <Popover.Dropdown ref={setDropdown}>
        <HistorySelector
          toggle={toggle}
          closeOnSelect={closeOnSelect}
        />
      </Popover.Dropdown>
    </Popover>
  );
}
