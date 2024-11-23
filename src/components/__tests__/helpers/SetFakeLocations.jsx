import { useSetAtom } from 'jotai';
import {
  currentLocationState,
  mapLocationState,
} from '../../../atoms/locationStates.js';
import { FakeLocationHistory } from './fakeDataUtils.js';
import { Text } from '@mantine/core';

export default function SetFakeLocations({ option = 1 }) {
  const setCurrentLocation = useSetAtom(currentLocationState);
  const setMapLocation = useSetAtom(mapLocationState);

  const fakeLocation =
    FakeLocationHistory[FakeLocationHistory.length - option];

  setCurrentLocation(fakeLocation);
  setMapLocation(fakeLocation);

  return <Text>Fake locations set to: {fakeLocation.address}</Text>;
}
