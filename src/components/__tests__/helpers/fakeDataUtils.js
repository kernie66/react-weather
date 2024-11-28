import { fork } from 'radash';
import { locationHistoryData } from '../data/locationHistoryData.js';

export const FakeLocationHistory = locationHistoryData;

export const getFakeLocationOption = (option = 1) => {
  const fakeLocationOption =
    FakeLocationHistory[FakeLocationHistory.length - option].address;

  return fakeLocationOption;
};

export const getSelectedOptions = (searchTerm) => {
  const [selected] = fork(FakeLocationHistory.toReversed(), (f) =>
    f.address.toLowerCase().includes(searchTerm)
  );

  return selected;
};

export const setPersistedHistory = () => {
  localStorage.setItem(
    'locationHistory',
    JSON.stringify(FakeLocationHistory)
  );
};

export const FakeGeocodeResult = [
  {
    address_components: [
      {
        long_name: '1A',
        types: ['street_number'],
      },
      {
        long_name: 'Testvägen',
        types: ['route'],
      },
      {
        long_name: 'Testort',
        types: ['sublocality', 'political', 'sublocality_level_1'],
      },
      {
        long_name: 'Testkommun',
        types: ['postal_town'],
      },
      {
        long_name: 'Testlän',
        types: ['administrative_level_1', 'political'],
      },
      {
        long_name: 'Testland',
        short_name: 'TL',
        types: ['country', 'political'],
      },
      {
        long_name: '175 00',
        types: ['postal_code'],
      },
    ],
    formatted_address: 'Testvägen 1A, 175 00 Testkommun, Testland',
  },
];
