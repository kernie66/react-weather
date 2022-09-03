import { InfoWindowF, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import { useAddress } from "../contexts/AddressProvider";

export default function SelectOnMap() {
  const { getAddress, getPosition } = useAddress();
  const [popover, setPopover] = useState(false);

  const clickOnMarker = ((ev) => {
    console.log("Marker clicked");
    setPopover(true);
  });

  const closeInfo = (() => {
    setPopover(false);
    console.log("Info closed");
  })

  const infoOptions = {
    pixelOffset: new window.google.maps.Size(0, -20),
  };

  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 5,
    color: 'dodgerblue',
  }
  
  return (
    <>
      <MarkerF
        position={getPosition}
        icon="http://maps.google.com/mapfiles/ms/icons/blue.png"
        onClick={clickOnMarker}
        className="marked-position"
      />

      {popover &&
        <InfoWindowF
          position={getPosition}
          onCloseClick={closeInfo}
          options={infoOptions}
        >
          <div style={divStyle}>
            <h5>{getAddress}</h5>
          </div>
        </InfoWindowF>
      }
    </>
  );
};