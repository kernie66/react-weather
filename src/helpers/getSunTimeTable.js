import dayjs from 'dayjs';
import { getAllSunTimes } from './getSunInfo.js';
import { isNumber } from 'radash';

const formatSunTime = (sunTime) => {
  const dayjsSunTime = dayjs(sunTime);
  if (dayjsSunTime.isValid()) {
    return dayjsSunTime.format('HH:mm:ss');
  } else {
    return 'Inträffar inte';
  }
};

const formatDiff = (minutesDiff) => {
  if (isNumber(minutesDiff)) {
    if (minutesDiff === 0) {
      return 'mindre än en minut';
    }
    let supplementString = ' senare';
    if (minutesDiff > 0) {
      supplementString = ' tidigare';
    }
    const minutes = Math.abs(minutesDiff);
    if (minutes === 1) {
      return 'en minut' + supplementString;
    }
    return minutes + ' minuter' + supplementString;
  }
  return 'ej giltig';
};

export const getSunTimeTable = (date, position) => {
  const allSunTimes = getAllSunTimes(date, position);
  const allDayOldSunTimes = getAllSunTimes(
    date.subtract(1, 'day'),
    position
  );
  const allWeekOldSunTimes = getAllSunTimes(
    date.subtract(1, 'week'),
    position
  );
  const sunTimeDate = dayjs(allSunTimes.noon).format('dddd LL');

  const createSunTimeRow = (label, parameter) => {
    let row = [label];
    row.push(formatSunTime(allSunTimes[parameter]));
    const currentSunTime = dayjs(allSunTimes[parameter]);
    const oneDayOldSunTime = dayjs(allDayOldSunTimes[parameter]).add(
      1,
      'day'
    );
    const oneWeekOldSunTime = dayjs(
      allWeekOldSunTimes[parameter]
    ).add(1, 'week');
    const dayDiff = oneDayOldSunTime.diff(currentSunTime, 'minutes');
    console.log(dayDiff);
    row.push(formatDiff(dayDiff));
    const weekDiff = oneWeekOldSunTime.diff(
      currentSunTime,
      'minutes'
    );
    console.log(weekDiff);
    row.push(formatDiff(weekDiff));

    return row;
  };
  const sunTableData = {
    head: ['Soltillstånd', 'Tid', 'Skillnad 1 dag', '1 vecka'],
    body: [
      createSunTimeRow('Natt slutar', 'nightEnd'),
      createSunTimeRow('Astronomisk gryning', 'nauticalDawn'),
      createSunTimeRow('Gryning', 'dawn'),
      createSunTimeRow('Soluppgång börjar', 'sunrise'),
      createSunTimeRow('Soluppgång slutar', 'sunriseEnd'),
      createSunTimeRow(
        'Gyllene morgontimmen slutar',
        'goldenHourEnd'
      ),
      createSunTimeRow('Solens middagstid', 'solarNoon'),
      createSunTimeRow(
        'Gyllene eftermiddagstimmen börjar',
        'goldenHour'
      ),
      createSunTimeRow('Solnedgång börjar', 'sunsetStart'),
      createSunTimeRow('Solnedgång slutar', 'sunset'),
      createSunTimeRow('Skymning', 'dusk'),
      createSunTimeRow('Astronomisk skymning', 'nauticalDusk'),
      createSunTimeRow('Natt', 'night'),
      createSunTimeRow('Midnatt', 'nadir'),
    ],
    caption: 'Solens tillstånd ' + sunTimeDate,
  };

  return sunTableData;
};

/*
  sunrise	sunrise (top edge of the sun appears on the horizon)
  sunriseEnd	sunrise ends (bottom edge of the sun touches the horizon)
  goldenHourEnd	morning golden hour (soft light, best time for photography) ends
  solarNoon	solar noon (sun is in the highest position)
  goldenHour	evening golden hour starts
  sunsetStart	sunset starts (bottom edge of the sun touches the horizon)
  sunset	sunset (sun disappears below the horizon, evening civil twilight starts)
  dusk	dusk (evening nautical twilight starts)
  nauticalDusk	nautical dusk (evening astronomical twilight starts)
  night	night starts (dark enough for astronomical observations)
  nadir	nadir (darkest moment of the night, sun is in the lowest position)
  nightEnd	night ends (morning astronomical twilight starts)
  nauticalDawn	nautical dawn (morning nautical twilight starts)
  dawn  dawn (morning nautical twilight ends, morning civil twilight starts)
*/
