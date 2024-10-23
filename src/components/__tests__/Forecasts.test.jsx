import { render, screen } from '../../../testing-utils';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import Forecasts from '../Forecasts.jsx';
import { expect, vi } from 'vitest';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import dayjs from 'dayjs';

const weatherDate = dayjs.unix(weatherDataJson.current.dt);
const fakeTodayDate = new Date(weatherDate.toDate());

describe('test Forecasts', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders no forecasts for current date', async () => {
    render(<Forecasts />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    // Wait for weather data, wrong date
    expect(
      await screen.findByText(
        /ingen väderprognos tillgänglig, är internet anslutet?/i
      )
    ).toBeInTheDocument();
  });

  it('renders forecasts for fake date', async () => {
    vi.setSystemTime(fakeTodayDate);

    const snapshot = render(<Forecasts />);
    expect(snapshot).toMatchSnapshot();

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    // Wait for weather data
    // Check first forecast
    expect(
      await screen.findByText(/idag 12:00/i)
    ).toBeInTheDocument();
    // Check last forecast
    expect(
      await screen.findByText(/imorgon 14:00/i)
    ).toBeInTheDocument();
    // Check total number of forecasts
    const todays = await screen.findAllByText(/idag/i);
    const tomorrows = await screen.findAllByText(/imorgon/i);
    expect(todays.length + tomorrows.length).toBe(12);
    // Check number of forecasts without rain
    expect(await screen.findAllByText(/uppehåll/i)).toHaveLength(8);
  });
});
