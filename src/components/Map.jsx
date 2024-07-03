import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { memo } from 'react';
import { Spinner } from 'reactstrap';
import { getGeocode } from 'use-places-autocomplete';
import { useAddress } from '../contexts/AddressProvider';
import decodeAddress from '../helpers/decodeAddress';
import SearchAddress from './SearchAddress';
import SelectOnMap from './SelectOnMap';
import mapStyles from '../helpers/mapStyles';
import CurrentPosition from './CurrentPosition';

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
  });
  const { setAddress, setPosition } = useAddress();

  async function clickOnMap(selection) {
    const position = {
      lat: selection.latLng.lat(),
      lng: selection.latLng.lng(),
    };
    const results = await getGeocode({ location: position });
    console.debug('Address:', results[0].formatted_address);
    console.debug('Latitude = ', position.lat);
    console.debug('Longitude = ', position.lng);
    setPosition(position);
    setAddress(decodeAddress(results[0]));
  }

  if (loadError) {
    return (
      <h3 className="text-center">Kan inte ladda Google Maps...</h3>
    );
  }

  if (!isLoaded) {
    return (
      <h3 className="text-center">
        Väntar på Google Maps...
        <Spinner animation="border" />
      </h3>
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
      <SearchAddress />
      <SelectOnMap />
    </GoogleMap>
  );
});
