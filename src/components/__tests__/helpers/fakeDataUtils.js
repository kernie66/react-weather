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
