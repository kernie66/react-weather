import { MarkerF } from '@react-google-maps/api';
import { useAtomValue } from 'jotai';
import { mapLocationState } from '../atoms/locationStates.js';

export default function SelectOnMap() {
  const mapLocation = useAtomValue(mapLocationState);

  /* v8 ignore start */
  const clickOnMarker = (ev) => {
    console.log('Marker clicked');
  };
  /* v8 ignore stop */

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
