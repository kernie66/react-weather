function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export default function getFlipValues() {
  const timeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit'
  };
  const timeFormat = new Intl.DateTimeFormat(undefined, timeFormatOptions);

  const dateFormatOptions = {
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  };
  const dateFormat = new Intl.DateTimeFormat(undefined, dateFormatOptions);

  const now = new Date().getTime();
  const time = timeFormat.format(now).split(':');
  const date = dateFormat.format(now).split(' ');

  const value = {
    sep: ":",
    hours: time[0],
    minutes: time[1],
    weekday: capitalizeFirstLetter(date[0]),
    day: date[1],
    month: capitalizeFirstLetter(date[2])
  };

  return(value);
};