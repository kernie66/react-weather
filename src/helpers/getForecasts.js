import dayjs from 'dayjs';
import { compareWeather } from './compareWeather.js';

const firstHours = 3; // Number of forecasts to always show
const maxConsecutiveHours = 3; // Number of skipped identical forecasts

// Find first forecast
const getFirstForecast = (hourlyWeather) => {
  let first;
  for (let i = 1; i < 48; i++) {
    if (
      dayjs().isBefore(
        dayjs.unix(hourlyWeather[i].dt).subtract(15, 'minutes')
      )
    ) {
      first = i;
      break;
    }
  }
  return first;
};

export const getForecasts = (hourlyWeather) => {
  const forecasts = [];
  let index;
  let count = 0;
  let skipped = 0;

  // Create an array of forecast indices to show
  const firstForecast = getFirstForecast(hourlyWeather);
  if (firstForecast) {
    for (let i = firstForecast; i < firstForecast + firstHours; i++) {
      forecasts.push(i.toString());
    }
    index = firstForecast + firstHours;
    count = firstHours;
    for (let i = index + 1; i < 48; i++) {
      if (skipped < maxConsecutiveHours) {
        if (!compareWeather(hourlyWeather[i], hourlyWeather[index])) {
          forecasts.push(i.toString());
          index = i;
          count++;
          skipped = 0;
        } else {
          skipped++;
        }
      } else {
        forecasts.push(i.toString());
        index = i;
        count++;
        skipped = 0;
      }
      if (count === 12) {
        break;
      }
    }
  }

  return forecasts;
};
