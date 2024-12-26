import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { memo, useEffect, useState } from 'react';
import { getGeocode } from 'use-places-autocomplete';
import decodeAddress from '../helpers/decodeAddress';
import SearchAddress from './SearchAddress';
import SelectOnMap from './SelectOnMap';
import mapStyles from '../helpers/mapStyles';
import { Center, Loader, Text } from '@mantine/core';
import { title } from 'radash';
import { useSetAtom, useAtomValue } from 'jotai';
import { mapLocationState } from '../atoms/locationStates.js';
import {
  mapAddressToggleState,
  mapHistoryToggleState,
} from '../atoms/toggleStates.js';

const libraries = ['places'];
const API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
const center = { lat: 59.476, lng: 17.905 };

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
};

export default memo(function Map() {
  // Loads the map using API KEY
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
    language: 'sv',
  });
  const setMapLocation = useSetAtom(mapLocationState);
  const mapHistoryOpened = useAtomValue(mapHistoryToggleState);
  const mapAddressOpened = useAtomValue(mapAddressToggleState);
  const [disableMouseEvents, setDisableMouseEvents] = useState(false);

  useEffect(() => {
    if (mapHistoryOpened || mapAddressOpened) {
      setDisableMouseEvents(true);
    } else {
      setDisableMouseEvents(false);
    }
  }, [mapAddressOpened, mapHistoryOpened]);

  async function clickOnMap(selection) {
    if (!disableMouseEvents) {
      const position = {
        lat: selection.latLng.lat(),
        lng: selection.latLng.lng(),
      };
      const results = await getGeocode({ location: position });
      console.debug('Address:', results[0].formatted_address);
      console.debug('Latitude = ', position.lat);
      console.debug('Longitude = ', position.lng);
      setMapLocation({
        position: position,
        address: title(decodeAddress(results[0])),
      });
    }
  }

  console.log(loadError, isLoaded);
  if (loadError) {
    return (
      <Center h="75vh">
        <Text c="red" fz="xl">
          Kan inte ladda Google Maps...
        </Text>
      </Center>
    );
  }

  if (!isLoaded) {
    return (
      <Center h="75vh">
        <Text fz="xl">Väntar på Google Maps...</Text>
        <Loader color="blue" size="xl" type="bars" />
      </Center>
    );
  }

  return (
    <GoogleMap
      options={mapOptions}
      zoom={12}
      center={center}
      mapContainerClassName="map-container"
      onClick={clickOnMap}
    >
      <SearchAddress />
      <SelectOnMap />
    </GoogleMap>
  );
});
