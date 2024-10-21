import { render, screen } from '../../../testing-utils';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import SummaryBanner from '../SummaryBanner.jsx';
import { vi, expect, afterAll } from 'vitest';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import dayjs from 'dayjs';

// Set the date to match mocked weather data
const weatherDate = dayjs.unix(weatherDataJson.current.dt);
const fakeTodayDate = new Date(weatherDate.toDate());
// Set hour to 22 to get late action
const fakeTodayDateLate = new Date(weatherDate.hour(22).toDate());
// Set hour to 26 to add one day
const fakeTomorrowDate = new Date(weatherDate.hour(26));

describe('SummaryBanner', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should render the summary banner from today', async () => {
    vi.setSystemTime(fakeTodayDate);
    render(<SummaryBanner />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    // Wait for weather data to render
    expect(await screen.findAllByText(/idag:/i)).toHaveLength(2);
    expect(await screen.findAllByText(/imorgon:/i)).toHaveLength(2);
    // Check that translated "today" becomes "tomorrow" for tomorrow's summary
    expect(
      await screen.findAllByText(
        /Det kommer att vara halvmolnigt imorgon/i
      )
    ).toHaveLength(2);
  });

  it('should render the summary banner from tomorrow', async () => {
    vi.setSystemTime(fakeTodayDateLate);
    render(<SummaryBanner />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    // Wait for weather data to render
    expect(await screen.findAllByText(/imorgon:/i)).toHaveLength(2);
    expect(await screen.findAllByText(/söndag:/i)).toHaveLength(2);
  });

  it('should render the summary banner from next day as today', async () => {
    vi.setSystemTime(fakeTomorrowDate);
    render(<SummaryBanner />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    // Wait for weather data to render
    expect(await screen.findAllByText(/idag:/i)).toHaveLength(2);
    expect(await screen.findAllByText(/fredag:/i)).toHaveLength(2);
    // Check that "today" is preserved in translation
    expect(
      await screen.findAllByText(
        /Det kommer att vara halvmolnigt idag/i
      )
    ).toHaveLength(2);
  });
});
