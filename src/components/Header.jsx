import SelectMapLocation from './SelectMapLocation';
import { Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import MenuButton from './MenuButton.jsx';
import OpenMapButton from './OpenMapButton.jsx';
import StationLocation from './StationLocation.jsx';

export default function Header() {
  const [mapOpened, { open: openMap, close: closeMap }] =
    useDisclosure(false);

  const closeMap2 = () => {
    closeMap();
    console.log('Close map');
  };

  return (
    <>
      <SelectMapLocation modal={mapOpened} closeModal={closeMap2} />
      <Group
        className="weather-header"
        justify="space-between"
        gap={0}
        mb={8}
      >
        <MenuButton />
        <StationLocation />
        <OpenMapButton openMap={openMap} />
      </Group>
    </>
  );
}
