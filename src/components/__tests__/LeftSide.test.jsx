import { render, screen } from '../../../testing-utils';
import LeftSide from '../LeftSide.jsx';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import dayjs from 'dayjs';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import { vi, expect } from 'vitest';

const weatherDate = dayjs.unix(weatherDataJson.current.dt);
const fakeTodayDate = new Date(weatherDate.toDate());
const fakeTonightDate = new Date(weatherDate.hour(22).toDate());

describe('test LeftSide', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders left side info at daytime', async () => {
    vi.setSystemTime(fakeTodayDate);
    const snapshot = render(<LeftSide />);

    expect(
      await screen.findByRole('button', { name: /soltider/i })
    ).toBeInTheDocument();

    // Find the sunset and sunrise times
    const sunUpDown = await screen.findAllByText(
      /[0-2[0-9]:[0-5][0-9]/
    );
    // Test the correct order: sunset -> sunrise
    expect(sunUpDown.length).toBe(2);
    expect(sunUpDown[0]).toHaveTextContent('21:41');
    expect(sunUpDown[1]).toHaveTextContent('04:38');
    expect(snapshot).toMatchSnapshot();
  });

  it('renders left side info at night', async () => {
    vi.setSystemTime(fakeTonightDate);
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
