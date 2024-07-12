import dayjs from 'dayjs';

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
  const firstHours = 3;
  const maxConsecutiveHours = 3;
  const forecasts = [];
  let index;
  let count = 0;
  let skipped = 0;

  const firstForecast = getFirstForecast(hourlyWeather);
  if (firstForecast) {
    for (let i = firstForecast; i < firstForecast + firstHours; i++) {
      forecasts.push(i.toString());
    }
    index = firstForecast + firstHours;
    count = firstHours;
    for (let i = index + 1; i < 48; i++) {
      console.log('count', count);
      console.log('index', index);
      console.log('skipped', skipped);
      console.log(
        'hourlyWeather[i].weather[0].icon',
        hourlyWeather[i].weather[0].icon
      );
      if (skipped < maxConsecutiveHours) {
        if (
          hourlyWeather[i].weather[0].icon !==
          hourlyWeather[index].weather[0].icon
        ) {
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
