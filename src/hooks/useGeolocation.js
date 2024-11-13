import { useEffect, useState } from 'react';
import { defaultPosition } from '../atoms/locationStates.js';

export const useGeolocation = () => {
  const [latitude, setLatitude] = useState(defaultPosition.lat);
  const [longitude, setLongitude] = useState(defaultPosition.lng);

  const handleSuccess = ({ coords: { latitude, longitude } }) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess);
    } else {
      console.log('Geolocation not available');
    }
  }, []);

  return {
    latitude,
    longitude,
  };
};
