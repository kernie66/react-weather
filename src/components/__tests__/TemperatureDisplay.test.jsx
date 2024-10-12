import { http, HttpResponse } from 'msw';
import { render, screen } from '../../../testing-utils';
import { server } from '../../mocks/server.js';
import TemperatureDisplay from '../TemperatureDisplay.jsx';
import { expect } from 'vitest';
import { omit } from 'radash';
import weatherDataJson from '../../../bruno/weather_alert_response.json';
import { testQueryClient } from '../../../testing-utils/render.jsx';

const baseURL = import.meta.env.VITE_BASE_URL;

describe('TemperatureDisplay', () => {
  it('should render the main temperature display area with weather alert', async () => {
    render(<TemperatureDisplay />);

    // Weather alert button
    expect(
      await screen.findByRole('button', { name: /vädervarning/i })
    ).toBeInTheDocument();

    // Current temperature
    expect(await screen.findByText('19')).toBeInTheDocument();
    expect(await screen.findByText(/\.2°C/)).toBeInTheDocument();
    // Max temperature
    expect(await screen.findByText('20')).toBeInTheDocument();
    expect(await screen.findByText(/\.9°C/)).toBeInTheDocument();
    // Min temperature
    expect(await screen.findByText('12')).toBeInTheDocument();
    expect(await screen.findByText(/\.0°C/)).toBeInTheDocument();
  });

  it('should render the main temperature display area without weather alert', async () => {
    const weatherDataNoAlert = omit(weatherDataJson, ['alerts']);
    server.use(
      http.get(`${baseURL}/onecall`, () => {
        console.log('Getting data without alert');
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
