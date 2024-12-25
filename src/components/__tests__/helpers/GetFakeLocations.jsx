import { useAtomValue } from 'jotai';
import {
  currentLocationState,
  mapLocationState,
} from '../../../atoms/locationStates.js';
import { Button, Text, Title } from '@mantine/core';

export default function GetFakeLocations({ showCurrent, showMap }) {
  const currentLocation = useAtomValue(currentLocationState);
  const mapLocation = useAtomValue(mapLocationState);

  return (
    <>
      {showCurrent && (
        <>
          <Title order={2}>Current fake location is:</Title>
          <Text>Current lat:</Text>
          <Button>{currentLocation.position.lat}</Button>
          <Text>Current lng:</Text>
          <Button>{currentLocation.position.lng}</Button>
          <Text>Current address:</Text>
          <Button>{currentLocation.address}</Button>
        </>
      )}
      {showMap && (
        <>
          <Title order={2}>Current fake map location is:</Title>
          <Text>Map lat:</Text>
          <Button>{mapLocation.position.lat}</Button>
          <Text>Map lng:</Text>
          <Button>{mapLocation.position.lng}</Button>
          <Text>Map address:</Text>
          <Button>{mapLocation.address}</Button>
        </>
      )}
    </>
  );
}
