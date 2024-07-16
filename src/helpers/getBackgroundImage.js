import dayjs from 'dayjs';
import SunCalc from 'suncalc';

export const getBackgroundImage = (weather) => {
  const now = dayjs();
  const sunTimes = SunCalc.getTimes(
    dayjs().toDate(),
    weather.lat,
    weather.lon
  );

  // Set default image to clear night sky
  let image = 'night_galaxy';
  let backgroundColor = 'rgba(0, 76, 153, 0.6)';
  let tempColor = 'steelblue';
  if (now > sunTimes.dawn && now < sunTimes.dusk) {
    backgroundColor = 'rgba(74, 127, 169, 0.8)';
    tempColor = 'sandybrown';
    if (now < sunTimes.sunrise) {
      image = 'sunrise';
    }
    if (now < sunTimes.dusk) {
      if (weather && weather.weather[0].id === 800) {
        image = 'clear_day';
      } else {
        image = 'cloudy';
      }
    }
  }
  return { image, backgroundColor, tempColor };
};
