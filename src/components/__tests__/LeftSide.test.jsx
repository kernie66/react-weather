import { render, screen, userEvent } from '../../../testing-utils';
import LeftSide from '../LeftSide.jsx';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import dayjs from 'dayjs';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import { vi, expect } from 'vitest';

const weatherDate = dayjs.unix(weatherDataJson.current.dt);
const fakeTodayDate = new Date(weatherDate.toDate());
const fakeBeforeSunsetDate = new Date(weatherDate.hour(2).toDate());
const fakeAfterSunsetDate = new Date(weatherDate.hour(22).toDate());

describe('test LeftSide', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders left side info at daytime', async () => {
    const user = userEvent.setup();
    vi.setSystemTime(fakeTodayDate);
    const snapshot = render(<LeftSide />);

    const suntimesButton = await screen.findByRole('button', {
      name: /soltider/i,
    });
    expect(suntimesButton).toBeInTheDocument();

    // Find the sunset and sunrise times
    const sunUpDown = await screen.findAllByText(
      /[0-2[0-9]:[0-5][0-9]/
    );
    // Test the correct order: sunset -> sunrise
    expect(sunUpDown.length).toBe(2);
    expect(sunUpDown[0]).toHaveTextContent('21:41');
    expect(sunUpDown[1]).toHaveTextContent('04:38');
    expect(screen.getByText(/luftfuktighet/i)).toBeInTheDocument();
    expect(screen.getByText(/vind/i)).toBeInTheDocument();
    expect(snapshot).toMatchSnapshot();

    // Click the suntimes button to open modal
    await user.click(suntimesButton);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(
      screen.getByText(/Solens tillstånd fredag 12 juli 2024/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/soltillstånd/i)).toBeInTheDocument();
    expect(
      screen.getByText(/solens middagstid/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/midnatt/i)).toBeInTheDocument();
  });

  it('renders left side info before sunset', async () => {
    vi.setSystemTime(fakeBeforeSunsetDate);
    render(<LeftSide />);

    expect(
      await screen.findByRole('button', { name: /soltider/i })
    ).toBeInTheDocument();

    // Find the sunset and sunrise times
    const sunUpDown = await screen.findAllByText(
      /[0-2[0-9]:[0-5][0-9]/
    );
    // Test the correct order: sunrise -> sunset
    expect(sunUpDown.length).toBe(2);
    expect(sunUpDown[0]).toHaveTextContent('04:37');
    expect(sunUpDown[1]).toHaveTextContent('21:41');
  });

  it('renders left side info after sunset', async () => {
    vi.setSystemTime(fakeAfterSunsetDate);
    render(<LeftSide />);

    expect(
      await screen.findByRole('button', { name: /soltider/i })
    ).toBeInTheDocument();

    // Find the sunset and sunrise times
    const sunUpDown = await screen.findAllByText(
      /[0-2[0-9]:[0-5][0-9]/
    );
    // Test the correct order: sunrise -> sunset
    expect(sunUpDown.length).toBe(2);
    expect(sunUpDown[0]).toHaveTextContent('04:38');
    expect(sunUpDown[1]).toHaveTextContent('21:40');
  });
});
