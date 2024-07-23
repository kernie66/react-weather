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
import { useClickOutside } from '@mantine/hooks';

export default function SearchAddress({
  addressOpened,
  openAddress,
  closeAddress,
}) {
  const map = useGoogleMap();
  const [location, setLocation] = useState(
    new window.google.maps.LatLng(59.476, 17.905)
  );
  const [options, setOptions] = useState([]);
  const { setMapLocation, getMapLocation } = useMapLocation();

  const handleClickOutside = () => {
    console.log('Clicked outside');
    // closeAddress();
  };
  const ref = useClickOutside(handleClickOutside);

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
    console.log('getMapPosition:', getMapLocation.position);
    const newLocation = new window.google.maps.LatLng(
      getMapLocation.position
    );
    map.panTo(newLocation);
    setLocation(newLocation);
  }, [map, getMapLocation]);

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
      closeAddress();
    }
  }

  const onChangeHandler = (value) => {
    console.log('value', value);
    if (value.length >= 2) {
      setValue(value);
      openAddress();
    } else {
      setValue(value, false);
      closeAddress();
      clearSuggestions();
    }
  };

  useEffect(() => {
    if (data) {
      const newOptions = data.map((option) => option.description);
      setOptions(newOptions);
    }
  }, [data]);

  const optionsFilter = ({ options }) => {
    console.log('Options:', options);
    return options;
  };

  return (
    <div className="search">
      <Autocomplete
        size="md"
        placeholder="Ange adress, ort eller plats"
        value={value}
        data={options}
        filter={optionsFilter}
        selectFirstOptionOnChange
        onChange={onChangeHandler}
        onOptionSubmit={selectionHandler}
        dropdownOpened={addressOpened}
        disabled={!ready}
        rightSection={
          value !== '' && (
            <CloseButton
              icon={<FiDelete size={20} />}
              onClick={() => setValue('', false)}
              aria-label="Clear value"
            />
          )
        }
      />
    </div>
  );
}
