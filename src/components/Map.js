import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { Spinner } from 'reactstrap';
import SearchAddress from './SearchAddress';

const libraries = ["places"];
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

export default function Map() {
  // Loads the map using API KEY
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  });

  return (
    <>
      {loadError ?
        <h1 className='text-center'>Kan inte ladda Google Maps...</h1>
        :
        <>
          {!isLoaded ?
            <Spinner animation="border" />
            :
            <>
              <GoogleMap
                zoom={12}
                center={{ lat: 59.476, lng: 17.905 }}
                mapContainerClassName='map-container'
              >
                <SearchAddress />
              </GoogleMap>
            </>
          }
        </>
      }
    </>
  );
};