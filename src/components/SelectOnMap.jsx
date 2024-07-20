import { InfoWindowF, MarkerF } from '@react-google-maps/api';
import { useState } from 'react';
import { Text } from '@mantine/core';
import { useMapLocation } from '../contexts/MapLocationProvider.jsx';

export default function SelectOnMap() {
  const { getMapLocation } = useMapLocation();
  const [popover, setPopover] = useState(false);

  const clickOnMarker = (ev) => {
    console.log('Marker clicked');
    setPopover(true);
  };

  const closeInfo = () => {
    setPopover(false);
    console.log('Info closed');
  };

  const infoOptions = {
    pixelOffset: new window.google.maps.Size(0, -20),
  };

  return (
    <>
      <MarkerF
        position={getMapLocation.position}
        icon="http://maps.google.com/mapfiles/ms/icons/blue.png"
        onClick={clickOnMarker}
        className="marked-position"
      />

      {popover && (
        <InfoWindowF
          position={getMapLocation.position}
          onCloseClick={closeInfo}
          options={infoOptions}
        >
          <Text c="dodgerblue" fw={500} fz="h4">
            {getMapLocation.address}
          </Text>
        </InfoWindowF>
      )}
    </>
  );
}
