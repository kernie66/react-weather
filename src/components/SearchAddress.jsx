import { useGoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Typeahead } from "react-bootstrap-typeahead";
import { useAddress } from "../contexts/AddressProvider";
import decodeAddress from "../helpers/decodeAddress";

export default function SearchAddress() {
  const map = useGoogleMap();
  const [location, setLocation] = useState(new window.google.maps.LatLng(59.476, 17.905))
  const { setAddress, getPosition, setPosition } = useAddress();

  // eslint-disable-next-line
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
    debounce: 500,
    requestOptions: {
      location: location,
      radius: 100 * 1000,
    }
  });

    useEffect(() => {
      map.panTo(getPosition);
      setLocation(new window.google.maps.LatLng(getPosition));
    }, [map, getPosition]);

  async function handleSelect(selection) {
    const address = selection[0].description;
    // setAddress(address);
    setValue(address, false);
    console.log("Select:", address);
    const results = await getGeocode({ address: address });
    const coords = getLatLng(results[0]);
    setPosition(coords);
    setAddress(decodeAddress(results[0]));
  };

  return (
    <>
      <div className="search">
        <Typeahead
          id="searchAddress"
          labelKey="description"
          options={data}
          minLength={2}
          clearButton
          autoFocus
          onInputChange={(text, e) => {
            setValue(text);
          }}
          onChange={handleSelect}
          selectHint={(shouldSelect, event) => (
            event.key === "Enter" || shouldSelect
          )}
          placeholder="Ange adress, ort eller plats"
        />
      </div>
    </>
  );
};