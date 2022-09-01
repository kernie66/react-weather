import { GoogleMap, InfoBoxF, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';
import { memo, useState } from 'react';
import { Popover, PopoverBody, PopoverHeader, Spinner } from 'reactstrap';
import useLocalStorageState from 'use-local-storage-state';
import SearchAddress from './SearchAddress';

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
  const [position, setPosition] = useLocalStorageState("position", {
    defaultValue: { lat: 59.476, lng: 17.905 }
  });
  const [address, setAddress] = useLocalStorageState("address", {
    defaultValue: "Rotebro, Sollentuna, Sverige",
  });
  const [popover, setPopover] = useState(false);

  const clickOnMap = ((ev) => {
    console.log("latitide = ", ev.latLng.lat());
    console.log("longitude = ", ev.latLng.lng());
    setPosition({ lat: ev.latLng.lat(), lng: ev.latLng.lng() })
  });

  const clickOnMarker = ((ev) => {
    console.log("Marker clicked");
    setPopover(true);
  });

  const closeInfo = (() => {
    setPopover(false);
    console.log("Info closed");
  })

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
    color: 'dodgerblue',
  }
  
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
                options={{ styles: mapStyles }}
                zoom={12}
                center={center}
                mapContainerClassName='map-container'
                onClick={clickOnMap}
              >
                <SearchAddress
                  address={address} setAddress={setAddress}
                  position={position} setPosition={setPosition}
                />
                {position &&
                  <MarkerF
                    position={position}
                    icon="http://maps.google.com/mapfiles/ms/icons/blue.png"
                    onClick={clickOnMarker}
                    className="marked-position"
                  />
                }
                {popover &&
                <InfoWindowF
                    position={position}
                    onCloseClick={closeInfo}
                  >
                    <div style={divStyle}>
                      <h4>{address}</h4>
                      </div>
                      </InfoWindowF>
                }   
              </GoogleMap>
            </>
          }
        </>
      }
    </>
  );
});