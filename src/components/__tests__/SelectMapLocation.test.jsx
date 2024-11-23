import { cleanNotifications } from '@mantine/notifications';
import { useJsApiLoader } from '@react-google-maps/api';
import { vi } from 'vitest';
import {
  act,
  renderWithNotifications,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '../../../testing-utils/index.js';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import SelectMapLocation from '../SelectMapLocation.jsx';
import {
  deleteInput,
  openHistory,
  selectHome,
  selectLocation,
  selectOption,
} from './helpers/mapModalUtils.js';
import {
  FakeLocationHistory,
  getFakeLocationOption,
  setPersistedHistory,
} from './helpers/fakeDataUtils.js';
import SetFakeLocations from './helpers/SetFakeLocations.jsx';
import { defaultAddress } from '../../atoms/locationStates.js';

// Mock the Google modules
vi.mock('@react-google-maps/api', () => ({
  GoogleMap: vi.fn(),
  useJsApiLoader: vi.fn(),
}));
vi.mock('use-places-autocomplete', () => ({
  getGeocode: vi.fn(),
}));

vi.mock('@mantine/hooks', async (importOriginal) => {
  const realHooks = await importOriginal();
  return { ...realHooks };
});

describe('test SelectMapLocation modal', () => {
  const originalWindow = window.location;
  const originalNavigator = navigator.geolocation;

  // Note: The modal uses aria-hidden, so {hidden: true} is needed
  const closeModal = vi.fn();

  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  // Ensure geolocation is active for current position
  beforeAll(() => {
    useJsApiLoader.mockReturnValue({
      loadError: false,
      isLoading: true,
    });

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { protocol: 'https:' },
    });
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition: vi.fn() },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    act(() => {
      cleanNotifications();
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalWindow,
    });
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: originalNavigator,
    });
    vi.restoreAllMocks();
  });

  it('selects location from history', async () => {
    const user = userEvent.setup();
    const initialOption = 1;
    const firstOption = 2;
    const secondOption = 4;

    setPersistedHistory();

    renderWithNotifications(
      <>
        <SetFakeLocations option={initialOption} />
        <SelectMapLocation modal={true} closeModal={closeModal} />
      </>
    );

    // Check the rendered modal
    expect(
      await screen.findByText(/ange adress för väder/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(getFakeLocationOption(initialOption))
    ).toBeInTheDocument();
    expect(await screen.queryByRole('listbox')).toBeNull();
    expect(
      await screen.findAllByRole('dialog', { hidden: true })
    ).toHaveLength(1);

    // Click the History button
    await openHistory({
      user,
      screen,
      numberOfOptions: FakeLocationHistory.length,
    });

    expect(
      await screen.findAllByRole('dialog', { hidden: true })
    ).toHaveLength(2);

    // Select an option
    await selectOption({
      user,
      screen,
      option: getFakeLocationOption(firstOption),
    });

    // Check that the location is shown twice, both in history button
    // and as option to autocomplete input
    expect(
      screen.getAllByText(getFakeLocationOption(firstOption))
    ).toHaveLength(2);
    // And that the input field value is the same
    const historyInput = screen.getByRole('textbox', {
      name: /indatafält för historik/i,
      hidden: true,
    });
    expect(historyInput).toHaveValue(
      getFakeLocationOption(firstOption)
    );

    // Clear the input with delete button
    await deleteInput(user, screen);

    expect(historyInput).toHaveValue('');
    expect(
      screen.getAllByRole('option', { hidden: true })
    ).toHaveLength(FakeLocationHistory.length);

    // Select another option
    await selectOption({
      user,
      screen,
      option: getFakeLocationOption(secondOption),
    });

    // Select this address
    await selectLocation(user, screen);

    // Wait for the modal to close
    await waitForElementToBeRemoved(() =>
      screen.queryByRole('option', { hidden: true })
    );
    expect(
      await screen.findAllByRole('dialog', { hidden: true })
    ).toHaveLength(1);
    expect(closeModal).toHaveBeenCalledTimes(1);

    // Check that the notification is shown
    const notification = await screen.findByRole('alert');
    expect(notification).toBeInTheDocument();
    expect(
      screen.getByText(/väderposition uppdaterad/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(getFakeLocationOption(secondOption), {
        hidden: true,
      })
    ).toHaveLength(2);
  });

  it('selects home (default) location', async () => {
    const user = userEvent.setup();
    const initialOption = 3;

    setPersistedHistory();

    renderWithNotifications(
      <>
        <SetFakeLocations option={initialOption} />
        <SelectMapLocation modal={true} closeModal={closeModal} />
      </>
    );

    // Check the rendered modal
    expect(
      await screen.findByText(/ange adress för väder/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(getFakeLocationOption(initialOption))
    ).toBeInTheDocument();
    expect(await screen.queryByRole('listbox')).toBeNull();
    expect(
      await screen.findAllByRole('dialog', { hidden: true })
    ).toHaveLength(1);

    // Click the Home button
    await selectHome(user, screen);

    screen.debug(undefined, Infinity);
    // Wait for the modal to close
    expect(
      await screen.findAllByRole('dialog', { hidden: true })
    ).toHaveLength(1);
    expect(closeModal).toHaveBeenCalledTimes(1);

    // Check that the notification is shown
    const notification = await screen.findByRole('alert');
    expect(notification).toBeInTheDocument();
    expect(
      screen.getByText(/väderposition uppdaterad/i)
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(defaultAddress, {
        hidden: true,
      })
    ).toHaveLength(2);
  });

  it('selects current browser location', async () => {
    const user = userEvent.setup();
  });
});
