import dayjs from 'dayjs';

export const getExpireTime = ({
  expireHour,
  expireMinute,
  expireSecond,
  relativeTime = false,
}) => {
  const now = dayjs();

  let setExpireHour = expireHour % 24 || now.hour();
  let setExpireMinute = expireMinute % 60 || 0;
  let setExpireSecond = expireSecond % 60 || 0;

  // Check if time already passed
  if (now.hour() >= expireHour) {
    setExpireHour += 24;
  } else if (now.minute() >= expireMinute) {
    setExpireMinute += 1;
  }

  const expireDate = now
    .hour(setExpireHour)
    .minute(setExpireMinute)
    .second(setExpireSecond);

  const expireTime = expireDate.diff(now);

  return expireTime;
};
