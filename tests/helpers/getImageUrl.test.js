import { expect, it, describe } from 'vitest';
import {
  getClipArtUrl,
  getWeatherIconUrl,
  getWeatherImageUrl,
} from '../../src/helpers/getImageUrl.js';

describe('getImageUrl', () => {
  it('creates weather image url from file name', () => {
    expect(getWeatherImageUrl('testImage')).toContain(
      '/src/assets/images/weather/testImage'
    );
  });
  it('creates clipart url from file name', () => {
    expect(getClipArtUrl('testClipart')).toContain(
      '/src/assets/images/clipart/testClipart'
    );
  });
  it('creates clear day weather icon url from params', () => {
    expect(getWeatherIconUrl(800, '02d', 0.5)).toContain(
      '/src/assets/weather_icons/PNG/128/day_clear.png'
    );
  });
  it('creates rainy full moon night weather icon url from params', () => {
    expect(getWeatherIconUrl(300, '04n', 0.5)).toContain(
      '/src/assets/weather_icons/PNG/128/night_full_moon_rain.png'
    );
  });
  it('creates cloudy half moon night weather icon url from params', () => {
    expect(getWeatherIconUrl(803, '02n', 0.2)).toContain(
      '/src/assets/weather_icons/PNG/128/night_half_moon_partial_cloud.png'
    );
  });
});
