import { inRange } from 'radash';

export const getWeatherIcon = (
  id = 800,
  icon = '01d',
  moonPhase = 0
) => {
  let weatherIconName;
  let condition;
  let timeOfDay = 'day_';
  let moon = '';

  if (icon[2] === 'n') {
    timeOfDay = 'night_';
    if (moonPhase >= 0.4 && moonPhase <= 0.6) {
      moon = 'full_moon_';
    } else {
      moon = 'half_moon_';
    }
  }

  switch (true) {
    case id === 800:
      condition = 'clear';
      break;
    case id === 801:
    case id === 802:
    case id === 803:
      condition = 'partial_cloud';
      break;
    /*
    case id === 803:
      condition = 'cloudy';
      timeOfDay = '';
      moon = '';
      break;
    */
    case id === 804:
      condition = 'overcast';
      timeOfDay = '';
      moon = '';
      break;
    case id === 781:
      condition = 'tornado';
      timeOfDay = '';
      moon = '';
      break;
    case id >= 741:
      condition = 'fog';
      timeOfDay = '';
      moon = '';
      break;
    case id >= 700:
      condition = 'mist';
      timeOfDay = '';
      moon = '';
      break;
    case id >= 611:
      condition = 'sleet';
      break;
    case id >= 600:
    case id === 511:
      condition = 'snow';
      // Remove sun or moon if enough snow
      if (inRange(id, 601, 699) || id === 511) {
        timeOfDay = '';
        moon = '';
      }
      break;
    case id >= 300:
      condition = 'rain';
      // Remove sun or moon if enough rain
      if (inRange(id, 301, 399) || inRange(id, 501, 599)) {
        timeOfDay = '';
        moon = '';
      }
      break;
    case id >= 210 && id < 230:
      condition = 'thunder';
      timeOfDay = '';
      moon = '';
      break;
    case id >= 200:
      condition = 'rain_thunder';
      break;
    default:
      condition = 'clear';
  }

  weatherIconName = timeOfDay + moon + condition;
  return weatherIconName;
};
