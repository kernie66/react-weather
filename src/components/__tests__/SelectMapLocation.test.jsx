import { cleanNotifications } from '@mantine/notifications';
import { useJsApiLoader } from '@react-google-maps/api';
import { vi } from 'vitest';
import {
  act,
  render,
  renderWithNotifications,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '../../../testing-utils/index.js';
import Header from '../Header.jsx';
import { defaultAddress } from '../../atoms/locationStates.js';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import SelectMapLocation from '../SelectMapLocation.jsx';
import {
  closeMap,
  deleteInput,
  openHistory,
  selectLocation,
  selectOption,
} from './helpers/mapModalUtils.js';
import {
  FakeLocationHistory,
  getFakeLocationOption,
  setPersistedHistory,
} from './helpers/fakeDataUtils.js';

const fakeLocationOption2 = getFakeLocationOption(2);
const fakeLocationOption4 = getFakeLocationOption(4);

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
    setPersistedHistory();

    useJsApiLoader.mockReturnValue({
      loadError: false,
      isLoading: true,
    });

    renderWithNotifications(
      <SelectMapLocation modal={true} closeModal={closeModal} />
    );

    expect(
      await screen.findByText(/ange adress för väder/i)
    ).toBeInTheDocument();
    expect(screen.getByText(defaultAddress)).toBeInTheDocument();
    expect(await screen.queryByRole('listbox')).toBeNull();

    // Click the History button
    await openHistory({
      user,
      screen,
      numberOfOptions: FakeLocationHistory.length,
    });

    expect(screen.getByText(/nickstabadet/i)).toBeInTheDocument();
    expect(
      await screen.findAllByRole('dialog', { hidden: true })
    ).toHaveLength(2);

    // Select second option
    await selectOption({ user, screen, option: fakeLocationOption2 });

    // Check that the location is shown twice, both in history button
    // and as option to autocomplete input
    expect(screen.getAllByText(fakeLocationOption2)).toHaveLength(2);
    // And that the input field value is the same
    const historyInput = screen.getByRole('textbox', {
      name: /indatafält för historik/i,
      hidden: true,
    });
    expect(historyInput).toHaveValue(fakeLocationOption2);

    // Clear the input with delete button
    await deleteInput(user, screen);

    expect(historyInput).toHaveValue('');
    expect(
      screen.getAllByRole('option', { hidden: true })
    ).toHaveLength(FakeLocationHistory.length);

    // Select fourth option
    await selectOption({ user, screen, option: fakeLocationOption4 });

    // Select this address
    await selectLocation(user, screen);

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
      screen.getAllByText(fakeLocationOption4, { hidden: true })
    ).toHaveLength(2);
  });

  it('selects home (default) location', async () => {
    const user = userEvent.setup();

    useJsApiLoader.mockReturnValue({
      loadError: false,
      isLoading: true,
    });

    render(<Header />);

    // Click on the Map button
    await user.click(
      await screen.findByRole('button', {
        name: /öppna karta/i,
      })
    );
    expect(
      await screen.findByText(/ange adress för väder/i)
    ).toBeInTheDocument();

    // Check that the Select button is available
    const selectButton = await screen.findByRole('button', {
      name: /välj/i,
    });
    expect(selectButton).toBeInTheDocument();

    // Check that the Home button is available
    const homeButton = await screen.findByRole('button', {
      name: /hem/i,
    });
    expect(homeButton).toBeInTheDocument();

    // Check that the current Position button is available
    const positionButton = await screen.findByRole('button', {
      name: /position/i,
    });
    expect(positionButton).toBeInTheDocument();

    // Click the Close button
    await closeMap(user, screen);

    screen.debug(undefined, Infinity);
  });

  it('selects current browser location', async () => {
    const user = userEvent.setup();

    useJsApiLoader.mockReturnValue({
      loadError: false,
      isLoading: true,
    });

    render(<Header />);

    // Click on the Map button
    await user.click(
      await screen.findByRole('button', {
        name: /öppna karta/i,
      })
    );
    expect(
      await screen.findByText(/ange adress för väder/i)
    ).toBeInTheDocument();

    // Check that the Select button is available
    const selectButton = await screen.findByRole('button', {
      name: /välj/i,
    });
    expect(selectButton).toBeInTheDocument();

    // Check that the Home button is available
    const homeButton = await screen.findByRole('button', {
      name: /hem/i,
    });
    expect(homeButton).toBeInTheDocument();

    // Check that the current Position button is available
    const positionButton = await screen.findByRole('button', {
      name: /position/i,
    });
    expect(positionButton).toBeInTheDocument();

    // Check that the Close button is available and click on it
    const closeButton = screen.getByRole('button', {
      name: /stäng karta/i,
    });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    screen.debug(undefined, Infinity);
  });
});
