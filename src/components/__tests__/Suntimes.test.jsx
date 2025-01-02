import { describe, it, vi } from 'vitest';
import {
  render,
  screen,
  within,
} from '../../../testing-utils/index.js';
import SunTimes from '../Suntimes.jsx';
import SetFakeLocations from './helpers/SetFakeLocations.jsx';

const fakeTodayDate = new Date('2024-09-22T15:10');

describe('test Suntimes with modal', () => {
  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders sun times', async () => {
    vi.setSystemTime(fakeTodayDate);

    render(
      <>
        <SetFakeLocations option={5} />
        <SunTimes />
      </>
    );

    const sunriseIcon = await screen.findByAltText(/sunrise/i);
    expect(
      within(sunriseIcon.parentElement).getByText('06:41')
    ).toBeInTheDocument();

    const sunsetIcon = await screen.findByAltText(/sunset/i);
    expect(
      within(sunsetIcon.parentElement).getByText('18:54')
    ).toBeInTheDocument();
  });
});
