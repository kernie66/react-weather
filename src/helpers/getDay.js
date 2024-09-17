import dayjs from 'dayjs';
import { capitalize } from 'radash';

export const DAYS = ['Idag', 'Imorgon'];

export const getDayText = (date = dayjs(), tomorrowAsText = true) => {
  if (isToday(date)) {
    return DAYS[0];
  }
  if (isTomorrow(date) && tomorrowAsText) {
    return DAYS[1];
  }
  return capitalize(date.format('ddd'));
};

export const isToday = (date = dayjs()) => {
  if (dayjs().isSame(date, 'day')) {
    return true;
  }
  return false;
};

export const isTomorrow = (date = dayjs()) => {
  const tomorrow = dayjs().add(1, 'day');
  if (tomorrow.isSame(date, 'day')) {
    return true;
  }
  return false;
};
