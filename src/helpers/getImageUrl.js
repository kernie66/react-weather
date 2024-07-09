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

export function getSmallWeatherIconUrl(name) {
  const weatherIconUrl = new URL(
    `../assets/weather_icons/PNG/128/${name}.png`,
    import.meta.url
  ).href;

  return weatherIconUrl;
}

export function getLargeWeatherIconUrl(owmIcon) {
  let weatherIconURL = `http://openweathermap.org/img/wn/${owmIcon}@2x.png`;

  if (!owmIcon) {
    let name = 'day_partial_cloud';
    weatherIconURL = new URL(
      `../assets/weather_icons/PNG/256/${name}.png`,
      import.meta.url
    ).href;
  }
  return weatherIconURL;
}
