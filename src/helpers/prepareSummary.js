import dayjs from 'dayjs';
import { getDayText } from './getDay.js';

export const prepareSummary = (
  weatherArray,
  start = 0,
  number = 2
) => {
  let summaryArray = [];
  for (let i = start; i < start + number; i++) {
    summaryArray.push({
      text: weatherArray[i].summary,
      day: getDayText(dayjs.unix(weatherArray[i].dt)),
    });
  }
  return summaryArray;
};
