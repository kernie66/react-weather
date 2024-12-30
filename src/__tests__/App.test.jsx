import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../testing-utils/index.js';
import weatherDataJson from '../../bruno/weather_alert_response.json';
import weatherRainDataJson from '../../bruno/weather_rain_response.json';
import App from '../App.jsx';
import dayjs from 'dayjs';
import { testQueryClient } from '../../testing-utils/render.jsx';
import GetFakeWeatherTheme from '../components/__tests__/helpers/GetFakeWeatherTheme.jsx';
import { server } from '../mocks/server.js';
import { http, HttpResponse } from 'msw';

const baseURL = import.meta.env.VITE_BASE_URL;

const weatherDate = dayjs.unix(weatherDataJson.current.dt);
const fakeTodayDate = new Date(weatherDate.toDate());
const fakeTodayDateLate = new Date(weatherDate.hour(23).toDate());
const rainyWeatherDate = dayjs.unix(weatherRainDataJson.current.dt);
const fakeRainyTodayDate = new Date(
  rainyWeatherDate.hour(13).toDate()
);

describe('test App', () => {
  beforeEach(() => {
    testQueryClient.removeQueries();
    // localStorage.clear();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('renders the main app with cloudy day values', async () => {
    vi.setSystemTime(fakeTodayDate);
    render(
      <>
        <App />
        <GetFakeWeatherTheme />
      </>
    );

    expect(
      await screen.findByText(/ett ögonblick/i)
    ).toBeInTheDocument();
    const background = await screen.findByLabelText(/bakgrundsbild/i);
    expect(background).toBeInTheDocument();
    const computedStyle = window.getComputedStyle(background);
    expect(computedStyle.backgroundImage).toContain('cloudy');
    expect(
      screen.getByRole('button', { name: /cloudy/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sandybrown/i })
    ).toBeInTheDocument();
  });

  it('renders the main app with night values', async () => {
    vi.setSystemTime(fakeTodayDateLate);

    render(
      <>
        <App />
        <GetFakeWeatherTheme />
      </>
    );

    expect(
      await screen.findByText(/ett ögonblick/i)
    ).toBeInTheDocument();
    const background = await screen.findByLabelText(/bakgrundsbild/i);
    expect(background).toBeInTheDocument();
    const computedStyle = window.getComputedStyle(background);
    expect(computedStyle.backgroundImage).toContain('night_galaxy');
    expect(
      await screen.findByRole('button', { name: /night_galaxy/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /steelblue/i })
    ).toBeInTheDocument();
  });

  it('renders the main app with rainy day weather', async () => {
    vi.setSystemTime(fakeRainyTodayDate);
    server.use(
      http.get(`${baseURL}/onecall`, () => {
        console.log('weatherRainDataJson'); //, weatherRainDataJson);
        return HttpResponse.json(weatherRainDataJson);
      })
    );

    render(
      <>
        <App />
        <GetFakeWeatherTheme />
      </>
    );

    expect(
      await screen.findByText(/ett ögonblick/i)
    ).toBeInTheDocument();
    const background = await screen.findByLabelText(/bakgrundsbild/i);
    expect(background).toBeInTheDocument();
    const computedStyle = window.getComputedStyle(background);
    expect(computedStyle.backgroundImage).toContain('rain_on_glass');
    expect(
      screen.getByRole('button', { name: /rain_on_glass/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sandybrown/i })
    ).toBeInTheDocument();

    server.resetHandlers();
  });
});
