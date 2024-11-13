import { MarkerF } from '@react-google-maps/api';
import { useAtomValue } from 'jotai';
import { mapLocationState } from '../atoms/locationStates.js';

export default function SelectOnMap() {
  const mapLocation = useAtomValue(mapLocationState);

  const clickOnMarker = (ev) => {
    console.log('Marker clicked');
  };

  return (
    <>
      <MarkerF
        position={mapLocation.position}
        icon="https://maps.google.com/mapfiles/ms/icons/blue.png"
        onClick={clickOnMarker}
        className="marked-position"
      />
    </>
  );
}
