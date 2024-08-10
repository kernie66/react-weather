import dayjs from 'dayjs';
import SunCalc from 'suncalc';

// Define general day and night colors
export const defaultBackgroundImage = 'clear_day';
export const defaultBackgroundColor = 'rgba(74, 127, 169, 0.8)';
export const defaultInfoColor = 'orange.3';
export const defaultTempColor = 'sandybrown';
const nightBackgroundColor = 'rgba(0, 76, 153, 0.6)';
const nightInfoColor = 'blue.4';
const nightTempColor = 'steelblue';

export const getWeatherTheme = (weather) => {
  const now = dayjs();
  const sunTimes = SunCalc.getTimes(
    dayjs().toDate(),
    weather.lat,
    weather.lon
  );

  // Set default image to clear night sky
  let image = 'night_galaxy';
  let backgroundColor = nightBackgroundColor;
  let infoColor = nightInfoColor;
  let tempColor = nightTempColor;
  if (now > sunTimes.dawn && now < sunTimes.dusk) {
    backgroundColor = defaultBackgroundColor;
    infoColor = defaultInfoColor;
    tempColor = defaultTempColor;
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
  return {
    backgroundImage: image,
    backgroundColor: backgroundColor,
    infoColor: infoColor,
    tempColor: tempColor,
  };
};
