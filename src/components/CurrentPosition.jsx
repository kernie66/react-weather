import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { mapLocationState } from '../atoms/locationStates.js';
import { ActionIcon, Text, VisuallyHidden } from '@mantine/core';
import { TbLocation } from 'react-icons/tb';
import { getGeocode } from 'use-places-autocomplete';
import { title } from 'radash';
import decodeAddress from '../helpers/decodeAddress.js';
import { useSetState } from '@mantine/hooks';
import { useConfirm } from '../hooks/useConfirm.jsx';

export default function CurrentPosition({ selectPosition }) {
  const [mapLocation, setMapLocation] = useAtom(mapLocationState);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationServiceEnabled, setLocationServiceEnabled] =
    useState(false);
  const [getConfirmation, ConfirmModal] = useConfirm();
  const [confirmModalText, setConfirmModalText] = useSetState({
    title: '',
    message: '',
    confirmText: 'Bekräfta',
    cancelText: 'Avbryt',
    size: 'sm',
  });

  // Enable position button only if geolocation is available
  useEffect(() => {
    if ('geolocation' in navigator) {
      if (window.location.protocol === 'https:') {
        setLocationServiceEnabled(true);
        console.log('Geolocation is available');
      }
    }
  }, []);

  const handleSuccess = ({ coords: { latitude, longitude } }) => {
    console.log('Geolocation position received:', {
      latitude,
      longitude,
    });
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleError = (error) => {
    console.debug('Error getting current position');
    console.error(
      'Error code: ' + error.code + ' - ' + error.message
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        handleSuccess,
        handleError
      );
      console.log('Initiating geolocation, getting current position');
    } else {
      console.log(
        'Geolocation is not supported on this device/in this browser'
      );
    }
  }, []);

  async function clickPosition() {
    const oldLocation = mapLocation;
    const position = { lat: latitude, lng: longitude }; // getCurrentPosition();
    console.log('position', position);
    const results = await getGeocode({ location: position });
    console.debug('Address:', results[0].formatted_address);
    const userLocation = {
      address: title(decodeAddress(results[0])),
      position: position,
    };
    setMapLocation(userLocation);
    setConfirmModalText({
      title: (
        <Text fz={22} fw={500}>
          Välj nuvarande plats
        </Text>
      ),
      message: (
        <Text fz={18}>
          {'Vill du ändra din position'}
          <br />
          {'från'}:&nbsp;
          <Text span c="green" fz={18} fw={500}>
            {oldLocation.address}
          </Text>
          <br />
          {'till'}:&nbsp;
          <Text span c="blue" fz={18} fw={500}>
            {title(decodeAddress(results[0]))}
          </Text>
        </Text>
      ),
    });
    const confirm = await getConfirmation();
    if (confirm) {
      console.log('Byt plats');
      selectPosition(userLocation);
      //setLocation(userLocation);
    } else {
      console.log('Behåll plats');
      setMapLocation(oldLocation);
    }
  }

  return (
    <>
      <ConfirmModal
        title={confirmModalText.title}
        message={confirmModalText.message}
        confirmText={confirmModalText.confirmText}
        cancelText={confirmModalText.cancelText}
        size={confirmModalText.size}
      />

      {locationServiceEnabled && (
        <ActionIcon
          variant="outline"
          ms={40}
          size={36}
          px={8}
          py={2}
          onClick={clickPosition}
        >
          <TbLocation size={18} />
          <VisuallyHidden>Position</VisuallyHidden>
        </ActionIcon>
      )}
    </>
  );
}
