import SunCalc from 'suncalc';
import dayjs from 'dayjs';

export const getSunTimes = (date, position) => {
  let sunriseTime = '00:00';
  let sunsetTime = '23:59';
  let sunTimes = {};
  let afterSunrise = false;

  const currentTime = dayjs(date);
  const nextDay = currentTime.add(1, 'day');

  const currentSunTimes = SunCalc.getTimes(
    dayjs(currentTime).toDate(),
    position.lat,
    position.lon
  );

  const nextSunTimes = SunCalc.getTimes(
    dayjs(nextDay).toDate(),
    position.lat,
    position.lon
  );

  if (currentTime.isBefore(dayjs(currentSunTimes.sunrise))) {
    sunTimes.sunrise = dayjs(currentSunTimes.sunrise);
  } else {
    sunTimes.sunrise = dayjs(nextSunTimes.sunrise);
    afterSunrise = true;
  }

  if (currentTime.isBefore(dayjs(currentSunTimes.sunset))) {
    sunTimes.sunset = dayjs(currentSunTimes.sunset);
  } else {
    sunTimes.sunset = dayjs(nextSunTimes.sunset);
    afterSunrise = false;
  }

  if (sunTimes.sunrise) {
    sunriseTime = sunTimes.sunrise.format('HH:mm');
  }
  if (sunTimes.sunset) {
    sunsetTime = sunTimes.sunset.format('HH:mm');
  }

  return {
    sunriseTime,
    sunsetTime,
    afterSunrise,
  };
};
