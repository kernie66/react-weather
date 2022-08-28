import { useGoogleMap } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Typeahead } from "react-bootstrap-typeahead";

export default function SearchAddress({ address, setAddress, position, setPosition }) {
  const map = useGoogleMap();
  const [selected, setSelected] = useState([]);
  const [location, setLocation] = useState(new window.google.maps.LatLng(59.476, 17.905))

  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete({
    debounce: 500,
    requestOptions: {
      location: location,
      radius: 100 * 1000,
    }
  });

    useEffect(() => {
      map.panTo(position);
      setLocation(new window.google.maps.LatLng(position));
      console.log("Position:", position.lat, position.lng);
      new window.google.maps.Marker({
        position: position,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue.png",
      });
    }, [map, position]);

  async function handleSelect(selection) {
    const address = selection[0].description;
    setAddress(address);
    setValue(address, false);
    console.log("Select:", address);
    const results = await getGeocode({ address: address });
    const coords = await getLatLng(results[0]);
    setPosition(coords);
    console.log("Coords:", coords.lat, coords.lng);
  };

  function onChange(address) {
    console.log("onChange", (address[0] ? address[0].description : "Nothing") + " selected");
    setSelected(address);
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
          placeholder="Ange adress, ort eller plats"
        />
      </div>
    </>
  );
};