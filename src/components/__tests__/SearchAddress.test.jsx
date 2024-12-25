import { expect, vi } from 'vitest';
import { render, screen, userEvent } from '../../../testing-utils';
import { initialize } from '@anshulsanghi/googlemaps-vitest-mocks';
import Map from '../Map.jsx';
import { useJsApiLoader } from '@react-google-maps/api';
import { useState } from 'react';
import {
  getFakerGeocodeResult,
  getFakerPosition,
  getFakerSearchAddressOptions,
} from './helpers/fakeDataUtils.js';
import { fakerSV as faker } from '@faker-js/faker';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import GetFakeLocations from './helpers/GetFakeLocations.jsx';

// Get some search address data, with duplicate post
const FakerSearchAddressOptions = getFakerSearchAddressOptions({
  duplicate: true,
});

const FakerGeocodeResult = getFakerGeocodeResult();

const FakerPosition = getFakerPosition();

// Mock the Google modules
vi.mock('@react-google-maps/api', async (importOriginal) => {
  const realApi = await importOriginal();
  return {
    ...realApi,
    //GoogleMap: vi.fn(),
    useJsApiLoader: vi.fn(),
  };
});

const clearSuggestionsSpy = vi.fn();

vi.mock('use-places-autocomplete', async (importOriginal) => {
  const realFunctions = await importOriginal();
  console.log('realFunctions', realFunctions.default);
  return {
    ...realFunctions,
    getGeocode: vi.fn().mockImplementation(() => FakerGeocodeResult),
    getLatLng: vi.fn().mockImplementation(() => FakerPosition),
    default: vi.fn().mockImplementation(() => {
      const [newValue, setNewValue] = useState('');
      const [fakeData, setFakeData] = useState([]);

      const setValue = vi.fn().mockImplementation((value) => {
        setNewValue(() => value);
        setFakeData(FakerSearchAddressOptions);
      });

      const clearSuggestions = vi.fn().mockImplementation(() => {
        setFakeData([]);
        console.log('Clear suggestions (fake)');
        clearSuggestionsSpy();
      });

      return {
        ready: {},
        value: newValue,
        setValue: setValue,
        suggestions: {
          status: null,
          data: fakeData,
        },
        clearSuggestions: clearSuggestions,
      };
    }),
  };
});

/*
vi.mock('@mantine/hooks', async (importOriginal) => {
  const realHooks = await importOriginal();
  return { ...realHooks };import { expect } from "@storybook/test";

});
// */
describe('test SearchAddress within Map', () => {
  beforeAll(() => {
    useJsApiLoader.mockReturnValue({
      loadError: false,
      isLoading: false,
      isLoaded: true,
    });
  });
  beforeEach(() => {
    initialize();
    vi.clearAllMocks();
  });

  it('selects an address from the map address search field', async () => {
    const user = userEvent.setup();
    console.log('Starting');
    render(
      <>
        <Map />
        <GetFakeLocations showMap={true} />
      </>
    );

    // Check that the address input field exist, without delete button
    const addressInput = await screen.findByPlaceholderText(
      /ange adress, ort eller plats/i
    );
    expect(addressInput).toBeInTheDocument();

    // Focus and input text
    await user.click(addressInput);
    expect(addressInput).toHaveFocus();

    const inputText = faker.word.sample(3);
    await user.keyboard(inputText);
    expect(addressInput).toHaveValue(inputText);
    expect(clearSuggestionsSpy).toHaveBeenCalledOnce();

    // Check and select one of the address options
    expect(screen.getAllByRole('option')).toHaveLength(5);
    const searchAddressOption = faker.helpers.arrayElement(
      FakerSearchAddressOptions
    ).description;
    expect(
      await screen.findByRole('option', {
        name: searchAddressOption,
      })
    ).toBeInTheDocument();
    const selectedAddress = screen.getByRole('option', {
      name: searchAddressOption,
    });
    await user.click(selectedAddress);
    expect(addressInput).toHaveValue(searchAddressOption);
    expect(clearSuggestionsSpy).toHaveBeenCalledTimes(2);

    // Check mocked functions
    expect(getGeocode).toHaveBeenCalledWith({
      address: searchAddressOption,
    });
    expect(getLatLng).toHaveBeenCalledWith(FakerGeocodeResult[0]);

    // Check the resulting atom values
    expect(
      await screen.findByRole('button', {
        name: FakerGeocodeResult[0].formatted_address,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', {
        name: FakerPosition.lat,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', {
        name: FakerPosition.lng,
      })
    ).toBeInTheDocument();
  });

  it('deletes the input from the map address search field', async () => {
    const user = userEvent.setup();
    console.log('Starting');
    render(
      <>
        <Map />
      </>
    );

    // Check that the address input field exist, without delete button
    const addressInput = await screen.findByPlaceholderText(
      /ange adress, ort eller plats/i
    );
    expect(addressInput).toBeInTheDocument();
    expect(
      await screen.queryByRole('button', {
        name: /radera inmatning/i,
      })
    ).not.toBeInTheDocument();

    // Focus and input text
    await user.click(addressInput);
    expect(addressInput).toHaveFocus();

    const inputText = faker.word.sample(3);
    await user.keyboard(inputText);
    expect(addressInput).toHaveValue(inputText);
    expect(clearSuggestionsSpy).toHaveBeenCalledOnce();

    // Check that the delete button is shown
    const deleteButton = await screen.findByRole('button', {
      name: /radera inmatning/i,
    });
    expect(deleteButton).toBeInTheDocument();

    // Click the delete button
    await user.click(deleteButton);
    expect(addressInput).toHaveValue('');

    // Check that the address input field exist, without delete button
    expect(addressInput).toBeInTheDocument();
    expect(
      await screen.queryByRole('button', {
        name: /radera inmatning/i,
      })
    ).not.toBeInTheDocument();
  });
});
