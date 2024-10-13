import { render, screen } from '../../../testing-utils';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import SummaryBanner from '../SummaryBanner.jsx';
import { vi, expect, afterAll } from 'vitest';

// Set the date to match mocked weather data
const fakeTodayDate = new Date('2024-07-12T12:34');
const fakeTodayDateLate = new Date('2024-07-12T22:34');

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
    // screen.debug();
    expect(await screen.findAllByText(/idag/i)).toHaveLength(2);
    expect(await screen.findAllByText(/imorgon/i)).toHaveLength(2);
    screen.debug();
  });

  it('should render the summary banner from tomorrow', async () => {
    vi.setSystemTime(fakeTodayDateLate);
    render(<SummaryBanner />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();
    // screen.debug();
    expect(await screen.findAllByText(/imorgon/i)).toHaveLength(2);
    expect(await screen.findAllByText(/söndag/i)).toHaveLength(2);
    screen.debug();
  });
});
