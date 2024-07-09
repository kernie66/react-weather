import { getWeatherIcon } from './getWeatherIcon.js';

export function getWeatherImageUrl(name) {
  const weatherImageUrl = new URL(
    `../assets/images/weather/${name}`,
    import.meta.url
  ).href;

  return weatherImageUrl;
}

export function getClipArtUrl(name) {
  const clipArtUrl = new URL(
    `../assets/images/clipart/${name}`,
    import.meta.url
  ).href;

  return clipArtUrl;
}

export function getWeatherIconUrl(id, icon, moon_phase) {
  let weatherIconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  const weatherIconName = getWeatherIcon(id, icon, moon_phase);

  if (weatherIconName) {
    weatherIconURL = new URL(
      `../assets/weather_icons/PNG/128/${weatherIconName}.png`,
      import.meta.url
    ).href;
  }
  return weatherIconURL;
}
