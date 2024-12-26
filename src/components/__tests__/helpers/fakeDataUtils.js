import { fork, title } from 'radash';
import { locationHistoryData } from '../data/locationHistoryData.js';
import { fakerSV as faker } from '@faker-js/faker';

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

export const getFakerGeocodeResult = () => {
  const street = faker.location.street();
  const city = faker.location.city();
  const county = faker.location.county();

  return [
    {
      address_components: [
        {
          long_name: faker.location.buildingNumber(),
          types: ['street_number'],
        },
        {
          long_name: street,
          types: ['route'],
        },
        {
          long_name: city,
          types: ['sublocality', 'political', 'sublocality_level_1'],
        },
        {
          long_name: county,
          types: ['postal_town'],
        },
        {
          long_name: faker.location.state(),
          types: ['administrative_level_1', 'political'],
        },
        {
          long_name: faker.location.country(),
          short_name: faker.location.countryCode(),
          types: ['country', 'political'],
        },
        {
          long_name: faker.location.zipCode(),
          types: ['postal_code'],
        },
      ],
      formatted_address: title(`${street}, ${city}, ${county}`),
    },
  ];
};

export const getFakerSearchAddressOptions = ({
  numberOfOptions = 5,
  duplicate,
}) => {
  const options = Array.from(Array(numberOfOptions), () => ({
    description: `${faker.location.street()}, ${faker.location.city()}, ${faker.location.country()}`,
  }));

  if (duplicate) {
    options.push(faker.helpers.arrayElement(options));
  }

  return options;
};

export const getFakerPosition = () => {
  return {
    lat: faker.location.latitude(),
    lng: faker.location.longitude(),
  };
};
