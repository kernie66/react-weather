import { getWeatherIcon } from './getWeatherIcon.js';

export const checkWeatherChange = (weather1, weather2) => {
  let weatherChanged = false;
  const weather1Icon = getWeatherIcon(
    weather1.weather[0].id,
    weather1.weather[0].icon,
    weather1.moonPhase
  );
  const weather2Icon = getWeatherIcon(
    weather2.weather[0].id,
    weather2.weather[0].icon,
    weather2.moonPhase
  );
  console.log('Weather icons:', weather1Icon, weather2Icon);

  // Check if at least 2 mm rain is expected
  if (weather2.rain && weather2.rain['1h'] >= 2) {
    console.log("weather2.rain['1h']", weather2.rain['1h']);
    weatherChanged = true;
  }

  // Check if rain decreases below 2 mm
  if (weather1.rain && weather1.rain['1h'] >= 2) {
    if (weather2.rain && weather2.rain['1h'] < 2) {
      console.log("weather1.rain['1h']", weather1.rain['1h']);
      console.log("weather2.rain['1h']", weather2.rain['1h']);
      weatherChanged = true;
    }
  }

  // Check if the temperature differs more than 5 degrees
  if (Math.abs(weather1.temp - weather2.temp) > 5) {
    weatherChanged = true;
  }

  // Check if the temperature falls below 2 degrees
  if (weather1.temp > 2 && weather2.temp <= 2) {
    weatherChanged = true;
  }

  // Check if the weather condition icons are different
  if (weather1Icon !== weather2Icon) {
    weatherChanged = true;
  }

  return weatherChanged;
};
