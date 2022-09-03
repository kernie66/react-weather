import { GoogleMap, InfoBoxF, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { memo, useState } from 'react';
import { Popover, PopoverBody, PopoverHeader, Spinner } from 'reactstrap';
import useLocalStorageState from 'use-local-storage-state';
import { getGeocode } from 'use-places-autocomplete';
import { useAddress } from '../contexts/AddressProvider';
import decodeAddress from '../helpers/decodeAddress';
import SearchAddress from './SearchAddress';
import SelectOnMap from './SelectOnMap';

const libraries = ["places"];
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY
const center = { lat: 59.476, lng: 17.905 }
const mapStyles = [
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#d6d6d6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#707070"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#858585"
      }
    ]
  }
];

export default memo( function Map() {
  // Loads the map using API KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const { getAddress, setAddress, getPosition, setPosition } = useAddress();

  async function clickOnMap(selection) {
    const position = { lat: selection.latLng.lat(), lng: selection.latLng.lng() }
    const results = await getGeocode({ location: position });
    console.log("Address:", results[0].formatted_address);
    console.log("latitide = ", position.lat);
    console.log("longitude = ", position.lng);
    setPosition(position);
    setAddress(decodeAddress(results[0]));
  };

  return (
    <>
      {loadError ?
        <h3 className='text-center'>Kan inte ladda Google Maps...</h3>
        :
        <>
          {!isLoaded ?
            <h3 className='text-center'>
              Väntar på Google Maps...
              <Spinner animation="border" />
            </h3>
            :
            <>
              <GoogleMap
                options={{ styles: mapStyles }}
                zoom={12}
                center={center}
                mapContainerClassName='map-container'
                onClick={clickOnMap}
              >
                <SearchAddress />
                <SelectOnMap />
              </GoogleMap>
            </>
          }
        </>
      }
    </>
  );
});