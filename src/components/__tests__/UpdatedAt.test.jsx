import { render, screen } from '../../../testing-utils';
import UpdatedAt from '../UpdatedAt.jsx';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import dayjs from 'dayjs';
import { vi } from 'vitest';

const weatherDate = dayjs.unix(weatherDataJson.current.dt);
const fakeTodayDate = new Date(weatherDate.toDate());

describe('test UpdatedAt', () => {
  afterAll(() => {
    vi.useRealTimers();
  });

  it('displays the time from current weather', async () => {
    vi.setSystemTime(fakeTodayDate);

    render(<UpdatedAt />);

    expect(
      await screen.findByText(/fredag 12 juli 2024 kl. 11:20/i)
    ).toBeInTheDocument();
  });
});
