import { render, screen } from '../../../testing-utils';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import SummaryBanner from '../SummaryBanner.jsx';
import { vi, expect, afterAll } from 'vitest';

// Set the date to match mocked weather data
const fakeTodayDate = new Date('2024-07-12T11:20');
const fakeTodayDateLate = new Date('2024-07-12T22:34');
const fakeTodayDate2 = new Date('2024-07-13T01:34');

describe('SummaryBanner', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
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
    vi.setSystemTime(fakeTodayDate2);
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
