import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai';
import { currentLocationState } from '../atoms/locationStates.js';

export default function CurrentPosition() {
  const setCurrentPosition = useSetAtom(currentLocationState);
  const [locationServiceEnabled, setLocationServiceEnabled] =
    useState(false);

  useEffect(() => {
    if ('geolocation' in navigator) {
      if (window.location.protocol === 'https:') {
        setLocationServiceEnabled(true);
        console.log('Geolocation is available');
      }
    }
  }, []);

  function getCurrentPosition() {
    if (locationServiceEnabled) {
      navigator.geolocation.getCurrentPosition(
        // success
        (coords) => {
          console.log(coords);
          return {
            lat: coords.coords.latitude,
            lng: coords.coords.longitude,
          };
        },
        // error
        (error) => {
          console.debug('Error getting current position');
          console.error(
            'Error code: ' + error.code + ' - ' + error.message
          );
        }
        // options
      );
    } else {
      console.log(
        'Geolocation is not supported on this device/in this browser'
      );
    }
    return false;
  }

  function clickHome() {
    const position = getCurrentPosition();
    if (position) {
      setCurrentPosition(position);
    }
  }

  return (
    <>
      {locationServiceEnabled && (
        <button className="locate" onClick={clickHome}>
          <img
            src="https://maps.google.com/mapfiles/kml/pal3/icon20.png"
            alt="Locate me"
          />
        </button>
      )}
    </>
  );
}
