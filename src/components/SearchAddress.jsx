import { FiDelete } from 'react-icons/fi';
import { useGoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import decodeAddress from '../helpers/decodeAddress';
import { Autocomplete, CloseButton } from '@mantine/core';
import { useMapLocation } from '../contexts/MapLocationProvider.jsx';

export default function SearchAddress() {
  const map = useGoogleMap();
  const [location, setLocation] = useState(
    new window.google.maps.LatLng(59.476, 17.905)
  );
  const [options, setOptions] = useState([]);
  const { setMapLocation, getMapLocationPosition } = useMapLocation();

  const {
    // eslint-disable-next-line
    ready,
    // eslint-disable-next-line
    value,
    setValue,
    // eslint-disable-next-line
    suggestions: { status, data },
    // eslint-disable-next-line
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 500,
    cache: 60 * 60 * 24 * 7, // One week
    requestOptions: {
      origin: location,
      locationBias: { center: location, radius: 10 * 1000 },
    },
  });

  useEffect(() => {
    // map.panTo(getPosition);
    console.log('getMapPosition:', getMapLocationPosition);
    const newLocation = new window.google.maps.LatLng(
      getMapLocationPosition
    );
    map.panTo(newLocation);
    setLocation(newLocation);
  }, [map, getMapLocationPosition]);

  async function selectionHandler(selection) {
    console.log('selection', selection);
    if (selection) {
      const address = selection;
      // setAddress(address);
      setValue(address, false);
      clearSuggestions();
      console.log('Select:', address);
      const results = await getGeocode({ address: address });
      const coords = getLatLng(results[0]);
      setMapLocation({
        position: coords,
        address: decodeAddress(results[0]),
      });
    }
  }

  const onChangeHandler = (value) => {
    console.log('value', value);
    if (value.length >= 2) {
      setValue(value);
    } else {
      setValue(value, false);
      clearSuggestions();
    }
  };

  useEffect(() => {
    if (data) {
      const newOptions = data.map((option) => option.description);
      setOptions(newOptions);
    }
  }, [data]);

  return (
    <div className="search">
      <Autocomplete
        size="md"
        placeholder="Ange adress, ort eller plats"
        value={value}
        data={options}
        selectFirstOptionOnChange
        onChange={onChangeHandler}
        onOptionSubmit={selectionHandler}
        disabled={!ready}
        rightSection={
          value !== '' && (
            <CloseButton
              icon={<FiDelete size={20} />}
              onClick={() => setValue('')}
              aria-label="Clear value"
            />
          )
        }
      />
    </div>
  );
}
