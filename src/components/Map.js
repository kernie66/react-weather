import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { memo, useState } from 'react';
import { Spinner } from 'reactstrap';
import useLocalStorageState from 'use-local-storage-state';
import SearchAddress from './SearchAddress';

const libraries = ["places"];
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default memo(function Map() {
  // Loads the map using API KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });
  const [position, setPosition] = useState({ lat: 59.476, lng: 17.905 });
  const [address, setAddress] = useLocalStorageState("address", {
    defaultValue: "Rotebro, Sollentuna, Sverige",
  });

  return (
    <>
      {loadError ?
        <h3 className='text-center'>Kan inte ladda Google Maps...</h3>
        :
        <>
          {!isLoaded || position === undefined ?
            <h3 className='text-center'>
              Väntar på Google Maps...
              <Spinner animation="border" />
            </h3>
            :
            <>
              <GoogleMap
                zoom={12}
                center={position}
                mapContainerClassName='map-container'
              >
                <SearchAddress
                  address={address} setAddress={setAddress}
                  position={position} setPosition={setPosition}
                />
              </GoogleMap>
            </>
          }
        </>
      }
    </>
  );
});