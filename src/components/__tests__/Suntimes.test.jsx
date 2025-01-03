import { describe, it, vi, expect } from 'vitest';
import {
  render,
  screen,
  userEvent,
  within,
} from '../../../testing-utils/index.js';
import SunTimes from '../Suntimes.jsx';
import SetFakeLocations from './helpers/SetFakeLocations.jsx';

const fakeMarchDate = new Date('2024-03-20T03:10');
const fakeJuneDate = new Date('2024-06-20T15:10');
const fakeSeptemberDate = new Date('2024-09-22T15:10');
const fakeDecemberDate = new Date('2024-12-20T22:20');

describe('test Suntimes with modal', () => {
  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders sun times for March', async () => {
    const user = userEvent.setup();

    vi.setSystemTime(fakeMarchDate);

    render(
      <>
        <SetFakeLocations option={5} />
        <SunTimes />
      </>
    );

    const sunriseIcon = await screen.findByAltText(/sunrise/i);
    expect(
      within(sunriseIcon.parentElement).getByText('05:55')
    ).toBeInTheDocument();

    const sunsetIcon = await screen.findByAltText(/sunset/i);
    expect(
      within(sunsetIcon.parentElement).getByText('18:07')
    ).toBeInTheDocument();

    const suntimesButton = screen.getByRole('button', {
      name: /soltider/i,
    });
    await user.click(suntimesButton);
    expect(
      await screen.findByText(/solens tillstånd/i)
    ).toBeInTheDocument();
    const suntimesRows = screen.getAllByRole('row');
    expect(suntimesRows).toHaveLength(15);

    const nightRow = suntimesRows.filter((row) =>
      within(row).queryByText(/^natt$/i)
    );
    expect(
      within(nightRow[0]).getByText(/3 minuter senare/i)
    ).toBeInTheDocument();
    expect(
      within(nightRow[0]).getByText(/18 minuter senare/i)
    ).toBeInTheDocument();
  });

  it('renders sun times for June', async () => {
    const user = userEvent.setup();

    vi.setSystemTime(fakeJuneDate);

    render(
      <>
        <SetFakeLocations option={5} />
        <SunTimes />
      </>
    );

    const sunriseIcon = await screen.findByAltText(/sunrise/i);
    expect(
      within(sunriseIcon.parentElement).getByText('04:00')
    ).toBeInTheDocument();

    const sunsetIcon = await screen.findByAltText(/sunset/i);
    expect(
      within(sunsetIcon.parentElement).getByText('21:51')
    ).toBeInTheDocument();

    const suntimesButton = screen.getByRole('button', {
      name: /soltider/i,
    });
    await user.click(suntimesButton);
    expect(
      await screen.findByText(/solens tillstånd/i)
    ).toBeInTheDocument();
    const suntimesRows = screen.getAllByRole('row');
    expect(suntimesRows).toHaveLength(15);

    const sunriseRow = suntimesRows.filter((row) =>
      within(row).queryByText(/^soluppgång/i)
    );
    expect(sunriseRow).toHaveLength(2);
    expect(
      within(sunriseRow[0]).getByText(/samma tid/i)
    ).toBeInTheDocument();
    expect(
      within(sunriseRow[0]).getByText(/mindre än en minut/i)
    ).toBeInTheDocument();

    const nightRow = suntimesRows.filter((row) =>
      within(row).queryByText(/^natt$/i)
    );
    expect(
      within(nightRow[0]).getByText(/inträffar inte/i)
    ).toBeInTheDocument();
  });

  it('renders sun times for September', async () => {
    const user = userEvent.setup();

    vi.setSystemTime(fakeSeptemberDate);

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

    const suntimesButton = screen.getByRole('button', {
      name: /soltider/i,
    });
    await user.click(suntimesButton);
    expect(
      await screen.findByText(/solens tillstånd/i)
    ).toBeInTheDocument();
    const suntimesRows = screen.getAllByRole('row');
    expect(suntimesRows).toHaveLength(15);

    const midnightRow = suntimesRows.filter((row) =>
      within(row).queryByText(/^midnatt$/i)
    );
    expect(
      within(midnightRow[0]).getByText(/mindre än en minut/i)
    ).toBeInTheDocument();
    expect(
      within(midnightRow[0]).getByText(/3 minuter tidigare/i)
    ).toBeInTheDocument();
  });

  it('renders sun times for December', async () => {
    const user = userEvent.setup();

    vi.setSystemTime(fakeDecemberDate);

    render(
      <>
        <SetFakeLocations option={5} />
        <SunTimes />
      </>
    );

    const sunriseIcon = await screen.findByAltText(/sunrise/i);
    expect(
      within(sunriseIcon.parentElement).getByText('08:30')
    ).toBeInTheDocument();

    const sunsetIcon = await screen.findByAltText(/sunset/i);
    expect(
      within(sunsetIcon.parentElement).getByText('15:14')
    ).toBeInTheDocument();

    const suntimesButton = screen.getByRole('button', {
      name: /soltider/i,
    });
    await user.click(suntimesButton);
    expect(
      await screen.findByText(/solens tillstånd/i)
    ).toBeInTheDocument();
    const suntimesRows = screen.getAllByRole('row');
    expect(suntimesRows).toHaveLength(15);

    const sunsetRow = suntimesRows.filter((row) =>
      within(row).queryByText(/^solnedgång/i)
    );
    expect(sunsetRow).toHaveLength(2);
    expect(
      within(sunsetRow[0]).getByText(/mindre än en minut/i)
    ).toBeInTheDocument();
    expect(
      within(sunsetRow[0]).getByText(/en minut senare/i)
    ).toBeInTheDocument();
  });
});
