import { render, screen, userEvent } from '../../../testing-utils';
import CurrentWeather from '../CurrentWeather.jsx';
import { expect } from 'vitest';
import { http, HttpResponse } from 'msw';
import weatherRainDataJson from '../../../bruno/weather_rain_response.json';
import { testQueryClient } from '../../../testing-utils/render.jsx';
import { server } from '../../mocks/server';

const baseURL = import.meta.env.VITE_BASE_URL;

describe('test CurrentWeather', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    localStorage.clear();
  });

  it('renders the current clear weather icon and text', async () => {
    const user = userEvent.setup();

    render(<CurrentWeather />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    const weatherOverviewButton = await screen.findByRole('button', {
      name: /väderöversikt/i,
    });
    expect(weatherOverviewButton).toBeInTheDocument();
    expect(
      await screen.findByText(/växlande molnighet/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/uppehåll/i)).toBeInTheDocument();

    await user.click(weatherOverviewButton);
    expect(
      await screen.findByText(/väderöversikt för 2024-10-13/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/translated text 102/i)
    ).toBeInTheDocument();
  });

  it('renders the current rainy weather icon and text', async () => {
    server.use(
      http.get(`${baseURL}/onecall`, () => {
        console.log('weatherRainDataJson'); //, weatherRainDataJson);
        return HttpResponse.json(weatherRainDataJson);
      })
    );
    const user = userEvent.setup();

    render(<CurrentWeather />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    const weatherOverviewButton = await screen.findByRole('button', {
      name: /väderöversikt/i,
    });
    expect(weatherOverviewButton).toBeInTheDocument();
    screen.debug();
    expect(await screen.findByText(/lätt regn/i)).toBeInTheDocument();
    expect(await screen.findByText(/0.3 mm\/h/i)).toBeInTheDocument();
    expect(await screen.findByText(/36%/i)).toBeInTheDocument();
    expect(
      await screen.queryByText(/uppehåll/i)
    ).not.toBeInTheDocument();

    await user.click(weatherOverviewButton);
    expect(
      await screen.findByText(/väderöversikt för 2024-10-13/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/translated text 102/i)
    ).toBeInTheDocument();
    screen.debug();
  });
});
