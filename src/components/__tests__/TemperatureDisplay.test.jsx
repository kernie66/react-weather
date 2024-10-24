import { http, HttpResponse } from 'msw';
import {
  render,
  renderWithNotifications,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from '../../../testing-utils';
import { server } from '../../mocks/server.js';
import TemperatureDisplay from '../TemperatureDisplay.jsx';
import { expect } from 'vitest';
import { omit } from 'radash';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import { testQueryClient } from '../../../testing-utils/render.jsx';

const baseURL = import.meta.env.VITE_BASE_URL;

describe('test TemperatureDisplay', () => {
  it('renders the main temperature display area with weather alert', async () => {
    const user = userEvent.setup();

    const snapshot = renderWithNotifications(<TemperatureDisplay />);

    // Weather alert button
    const alertButton = await screen.findByRole('button', {
      name: /vädervarning/i,
    });
    expect(alertButton).toBeInTheDocument();

    // Current temperature
    expect(await screen.findByText('19')).toBeInTheDocument();
    expect(await screen.findByText(/\.2°C/)).toBeInTheDocument();
    // Max temperature
    expect(await screen.findByText('20')).toBeInTheDocument();
    expect(await screen.findByText(/\.9°C/)).toBeInTheDocument();
    // Min temperature
    expect(await screen.findByText('12')).toBeInTheDocument();
    expect(await screen.findByText(/\.0°C/)).toBeInTheDocument();
    // Notification
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(
      await screen.queryByText(/kategori/i)
    ).not.toBeInTheDocument();
    expect(await screen.findByText(/regnskur/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/translated text: 127 words/i)
    ).toBeInTheDocument();
    expect(snapshot).toMatchSnapshot();

    // Open weather alert modal, should remove notification
    await user.click(alertButton);
    await waitForElementToBeRemoved(() =>
      screen.queryByText(/vädernotifiering/i)
    );
    console.log('Notification removed');
    expect(await screen.findByText(/kategori/i)).toBeInTheDocument();
    expect(await screen.findByText(/källa/i)).toBeInTheDocument();
    expect(await screen.findByText(/regnskur/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/translated text: 127 words/i)
    ).toBeInTheDocument();
  });

  it('renders the main temperature display area without weather alert', async () => {
    const weatherDataNoAlert = omit(weatherDataJson, ['alerts']);
    server.use(
      http.get(`${baseURL}/onecall`, () => {
        console.log('Getting weather data without alert');
        return HttpResponse.json(weatherDataNoAlert);
      })
    );
    // Ensure that a new query is fetched
    testQueryClient.invalidateQueries();
    render(<TemperatureDisplay />);

    // Current temperature
    expect(await screen.findByText('19')).toBeInTheDocument();
    expect(await screen.findByText(/\.2°C/)).toBeInTheDocument();
    // Max temperature
    expect(await screen.findByText('20')).toBeInTheDocument();
    expect(await screen.findByText(/\.9°C/)).toBeInTheDocument();
    // Min temperature
    expect(await screen.findByText('12')).toBeInTheDocument();
    expect(await screen.findByText(/\.0°C/)).toBeInTheDocument();
    // No weather alert button
    expect(
      screen.queryByRole('button', { name: /vädervarning/i })
    ).not.toBeInTheDocument();
  });
});
