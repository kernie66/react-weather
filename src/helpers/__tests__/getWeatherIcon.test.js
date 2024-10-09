import { getWeatherIcon } from '../getWeatherIcon.js';

describe('getWeatherIcon at day', () => {
  it('should get a clear day icon', () => {
    expect(getWeatherIcon(800, '02d', 0.5)).toBe('day_clear');
  });
  it('should get a light rainy day icon', () => {
    expect(getWeatherIcon(500, '09d', 0)).toBe('day_rain');
  });
  it('should get a full rain icon at day', () => {
    expect(getWeatherIcon(502, '07d', 0)).toBe('rain');
  });
  it('should get a light snowy day icon', () => {
    expect(getWeatherIcon(600, '07d', 0)).toBe('day_snow');
  });
  it('should get a full snow icon at day', () => {
    expect(getWeatherIcon(601, '13d', 0)).toBe('snow');
  });
});

describe('getWeatherIcon at night', () => {
  it('should get a clear full moon icon', () => {
    expect(getWeatherIcon(800, '02n', 0.4)).toBe(
      'night_full_moon_clear'
    );
  });
  it('should get a clear half moon icon', () => {
    expect(getWeatherIcon(800, '02n', 0.39)).toBe(
      'night_half_moon_clear'
    );
  });
  it('should get a light rain full moon icon', () => {
    expect(getWeatherIcon(500, '09n', 0.6)).toBe(
      'night_full_moon_rain'
    );
  });
  it('should get a light rain half moon icon', () => {
    expect(getWeatherIcon(500, '09n', 0.61)).toBe(
      'night_half_moon_rain'
    );
  });
  it('should get a full rain icon at night', () => {
    expect(getWeatherIcon(502, '07n', 0.5)).toBe('rain');
  });
  it('should get a light snowy full moon icon', () => {
    expect(getWeatherIcon(600, '07n', 0.555)).toBe(
      'night_full_moon_snow'
    );
  });
  it('should get a light snowy half moon icon', () => {
    expect(getWeatherIcon(600, '07n', 0.99)).toBe(
      'night_half_moon_snow'
    );
  });
  it('should get a full snow icon at night', () => {
    expect(getWeatherIcon(601, '13n', 0)).toBe('snow');
  });
});
