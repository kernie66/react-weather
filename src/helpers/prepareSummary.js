import dayjs from 'dayjs';
import { DAYS, getDayText } from './getDay.js';

export const prepareSummary = (
  weatherArray,
  start = 0,
  number = 2
) => {
  const summaryArray = [];
  if (weatherArray) {
    for (let i = start; i < start + number; i++) {
      summaryArray.push({
        text: weatherArray[i].summary,
        day: getDayText(dayjs.unix(weatherArray[i].dt)),
      });
    }
  } else {
    summaryArray.push({
      text: 'No data',
      day: DAYS[0],
    });
  }
  return summaryArray;
};
