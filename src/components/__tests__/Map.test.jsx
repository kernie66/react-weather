import { expect, vi } from 'vitest';
import { render, screen } from '../../../testing-utils/index.js';
import { initialize } from '@anshulsanghi/googlemaps-vitest-mocks';
import Map from '../Map.jsx';
import { useState } from 'react';
import {
  getFakerGeocodeResult,
  getFakerPosition,
} from './helpers/fakeDataUtils.js';
import GetFakeLocations from './helpers/GetFakeLocations.jsx';
import { useJsApiLoader } from '@react-google-maps/api';

const FakerGeocodeResult = getFakerGeocodeResult();

const FakerPosition = getFakerPosition();

// Mock the Google modules
vi.mock('@react-google-maps/api', async (importOriginal) => {
  const realApi = await importOriginal();
  return {
    ...realApi,
    GoogleMap: vi.fn().mockImplementation((props) => {
      props.onClick({
        latLng: {
          lat: () => FakerPosition.lat,
          lng: () => FakerPosition.lng,
        },
      });
    }),
    useJsApiLoader: vi.fn(),
  };
});

const clearSuggestionsSpy = vi.fn();

vi.mock('use-places-autocomplete', async (importOriginal) => {
  const realFunctions = await importOriginal();
  return {
    ...realFunctions,
    getGeocode: vi.fn().mockImplementation(() => FakerGeocodeResult),
    getLatLng: vi.fn().mockImplementation(() => FakerPosition),
    default: vi.fn().mockImplementation(() => {
      const [newValue, setNewValue] = useState('');

      const setValue = vi.fn().mockImplementation((value) => {
        setNewValue(() => value);
      });

      const clearSuggestions = vi.fn().mockImplementation(() => {
        clearSuggestionsSpy();
      });

      return {
        ready: {},
        value: newValue,
        setValue: setValue,
        suggestions: {
          status: null,
          data: [],
        },
        clearSuggestions: clearSuggestions,
      };
    }),
  };
});

describe('test Map', () => {
  beforeEach(() => {
    initialize();
    vi.clearAllMocks();
  });

  it('generates load error', async () => {
    useJsApiLoader.mockReturnValue({
      loadError: true,
      isLoaded: false,
    });

    render(<Map />);

    expect(
      await screen.findByText(/kan inte ladda google maps/i)
    ).toBeInTheDocument();
  });

  it('generates loading state', async () => {
    useJsApiLoader.mockReturnValue({
      isLoaded: false,
    });

    render(<Map />);

    expect(
      await screen.findByText(/väntar på google maps/i)
    ).toBeInTheDocument();
  });

  it('selects a location from the map', async () => {
    useJsApiLoader.mockReturnValue({
      isLoaded: true,
    });

    render(
      <>
        <Map />
        <GetFakeLocations showMap />
      </>
    );

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
});
