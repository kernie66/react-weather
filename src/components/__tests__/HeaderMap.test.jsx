import { vi } from 'vitest';
import {
  act,
  render,
  screen,
  userEvent,
} from '../../../testing-utils';
import Header from '../Header.jsx';
import { useJsApiLoader } from '@react-google-maps/api';
import { cleanNotifications } from '@mantine/notifications';
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

// const spy = vi.spyOn(Header.prototype, 'closeMap');
describe('test Map modal of Header', () => {
  const originalWindow = window.location;
  const originalNavigator = navigator.geolocation;

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: originalWindow,
    });
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: originalNavigator,
    });
    vi.clearAllMocks();
    act(() => {
      cleanNotifications();
    });
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders header and opens map with position, https:', async () => {
    const user = userEvent.setup();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { protocol: 'https:' },
    });
    Object.defineProperty(navigator, 'geolocation', {
      configurable: true,
      value: { getCurrentPosition: vi.fn() },
    });

    useJsApiLoader.mockReturnValue({
      loadError: false,
      isLoading: true,
    });

    render(<Header />);

    // Find the Map button
    const mapButton = await screen.findByRole('button', {
      name: /öppna karta/i,
    });
    expect(mapButton).toBeVisible();

    // Click on the Map button
    await user.click(mapButton);
    expect(
      await screen.findByText(/ange adress för väder/i)
    ).toBeInTheDocument();

    // Check that geoposition is available and called
    expect(
      navigator.geolocation.getCurrentPosition
    ).toHaveBeenCalledTimes(1);

    // Wait for Map to load
    expect(
      await screen.findByText(/laddar kartan/i)
    ).toBeInTheDocument();

    // Check mocked loading of Google Maps
    expect(
      await screen.findByText(/väntar på google maps/i)
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
  });

  it('renders header and opens map, no position, http:', async () => {
    const user = userEvent.setup();

    useJsApiLoader.mockReturnValue({
      loadError: false,
      isLoading: true,
    });

    render(<Header />);

    // Find the Map button
    const mapButton = await screen.findByRole('button', {
      name: /öppna karta/i,
    });
    expect(mapButton).toBeVisible();

    // Click on the Map button
    await user.click(mapButton);
    expect(
      await screen.findByText(/ange adress för väder/i)
    ).toBeInTheDocument();

    // Check mocked loading of Google Maps
    expect(
      await screen.findByText(/väntar på google maps/i)
    ).toBeInTheDocument();

    // Check that the current Position button is available
    const positionButton = await screen.queryByRole('button', {
      name: /position/i,
    });
    expect(positionButton).not.toBeInTheDocument();

    // Check that the Close button is available and click on it
    const closeButton = screen.getByRole('button', {
      name: /stäng karta/i,
    });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    screen.debug(undefined, Infinity);
  });
});
