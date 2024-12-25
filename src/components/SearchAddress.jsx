import { FiDelete } from 'react-icons/fi';
import { useGoogleMap } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import decodeAddress from '../helpers/decodeAddress';
import { Autocomplete, CloseButton } from '@mantine/core';
import { title, unique } from 'radash';
import { useAtom } from 'jotai';
import {
  defaultPosition,
  mapLocationState,
} from '../atoms/locationStates.js';
import { mapAddressToggleState } from '../atoms/toggleStates.js';

export default function SearchAddress() {
  const map = useGoogleMap();
  const [location, setLocation] = useState(
    defaultPosition
    //new window.google.maps.LatLng(59.476, 17.905)
  );
  const [options, setOptions] = useState([]);
  const [mapLocation, setMapLocation] = useAtom(mapLocationState);
  const [addressOpened, toggleAddress] = useAtom(
    mapAddressToggleState
  );

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
    const newLocation = {
      lat: mapLocation.position.lat,
      lng: mapLocation.position.lng,
    };
    // new window.google.maps.LatLng(
    //  mapLocation.position
    //);
    map.panTo(newLocation);
    setLocation(newLocation);
  }, [map, mapLocation]);

  async function selectionHandler(selection) {
    if (selection) {
      const address = title(selection);
      // setAddress(address);
      setValue(address, false);
      clearSuggestions();
      console.debug('Select:', address);
      const results = await getGeocode({ address: address });
      const coords = getLatLng(results[0]);
      setMapLocation({
        position: coords,
        address: title(decodeAddress(results[0])),
      });
      toggleAddress(false);
    }
  }

  const onChangeHandler = (value) => {
    if (value.length >= 2) {
      setValue(value);
      toggleAddress(true);
    } else {
      setValue(value, false);
      toggleAddress(false);
      clearSuggestions();
    }
  };

  useEffect(() => {
    if (data) {
      const newOptions = data.map((option) => option.description);
      // console.log('newOptions', newOptions);
      const uniqueOptions = unique(newOptions);
      // console.log('uniqueOptions', uniqueOptions);
      setOptions(uniqueOptions);
    }
  }, [data]);

  const optionsFilter = ({ options }) => {
    // console.log('Options:', options);
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
        comboboxProps={{ shadow: 'md' }}
        rightSection={
          value !== '' && (
            <CloseButton
              icon={<FiDelete size={20} />}
              onClick={() => setValue('', false)}
              aria-label="Radera inmatning"
            />
          )
        }
      />
    </div>
  );
}
