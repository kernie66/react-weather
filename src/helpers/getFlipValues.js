function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function getFlipValues() {
  const timeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  const timeFormat = new Intl.DateTimeFormat(undefined, timeFormatOptions);

  const dateFormatOptions = {
    weekday: 'short',
    month: 'short'
  };
  const dateFormat = new Intl.DateTimeFormat(undefined, dateFormatOptions);

  const dayFormatOptions = {
    day: '2-digit',
  };
  const dayFormat = new Intl.DateTimeFormat(undefined, dayFormatOptions);

  const now = new Date().getTime();
  const time = timeFormat.format(now).split(':');
  const date = dateFormat.format(now).split(' ');
  const day = dayFormat.format(now);
  const dayOfWeek = new Date().getDay();
  console.log(date[0], date[1], date[2])
  const value = {
    sep: ":",
    hours: time[0],
    minutes: time[1],
    weekday: capitalizeFirstLetter(date[1]),
    day: day,
    month: capitalizeFirstLetter(date[0].slice(0, 3)),
    dayOfWeek: dayOfWeek,
  };

  return(value);
};