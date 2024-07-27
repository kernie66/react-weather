import { MarkerF } from '@react-google-maps/api';
import { useMapLocation } from '../contexts/MapLocationProvider.jsx';

export default function SelectOnMap() {
  const { getMapLocation } = useMapLocation();

  const clickOnMarker = (ev) => {
    console.log('Marker clicked');
  };

  return (
    <>
      <MarkerF
        position={getMapLocation.position}
        icon="http://maps.google.com/mapfiles/ms/icons/blue.png"
        onClick={clickOnMarker}
        className="marked-position"
      />
    </>
  );
}
