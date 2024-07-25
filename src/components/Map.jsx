import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { memo } from 'react';
import { getGeocode } from 'use-places-autocomplete';
import decodeAddress from '../helpers/decodeAddress';
import SearchAddress from './SearchAddress';
import SelectOnMap from './SelectOnMap';
import mapStyles from '../helpers/mapStyles';
import CurrentPosition from './CurrentPosition';
import { Center, Loader, Text } from '@mantine/core';
import { useMapLocation } from '../contexts/MapLocationProvider.jsx';
import { title } from 'radash';

const libraries = ['places'];
const API_KEY = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
const center = { lat: 59.476, lng: 17.905 };

const mapOptions = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
};

export default memo(function Map({
  addressOpened,
  openAddress,
  closeAddress,
  disableMouseEvents = false,
}) {
  // Loads the map using API KEY
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const { setMapLocation } = useMapLocation();

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

  if (loadError) {
    return (
      <Center h="75vh">
        <Text color="red" fz="xl">
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
      <CurrentPosition />
      <SearchAddress
        addressOpened={addressOpened}
        openAddress={openAddress}
        closeAddress={closeAddress}
      />
      <SelectOnMap />
    </GoogleMap>
  );
});
