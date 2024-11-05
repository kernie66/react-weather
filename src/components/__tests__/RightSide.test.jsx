import { render, screen } from '../../../testing-utils';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import dayjs from 'dayjs';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import { vi, expect } from 'vitest';
import RightSide from '../RightSide.jsx';

const weatherDate = dayjs.unix(weatherDataJson.current.dt);
const fakeTodayDate = new Date(weatherDate.toDate());

describe('test RightSide', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders right side info with current wind gust', async () => {
    vi.setSystemTime(fakeTodayDate);
    const snapshot = render(<RightSide />);

    expect(await screen.findByText(/molntäcke/i)).toBeInTheDocument();
    screen.debug();
    expect(screen.getByText(/känns som/i)).toBeInTheDocument();
    expect(screen.getByText(/luftfuktighet/i)).toBeInTheDocument();
    expect(snapshot).toMatchSnapshot();
  });
});
