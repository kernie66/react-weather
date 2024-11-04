import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

export const getExpireTime = ({
  expireHour,
  expireMinute,
  expireSecond,
  relativeTime = false,
}) => {
  const now = dayjs();
  console.log('🚀 ~ useExpireDate ~ now:', now);
  let setExpireHour = expireHour % 24 || now.hour();
  let setExpireMinute = expireMinute % 60 || 0;
  let setExpireSecond = expireSecond % 60 || 0;

  console.log('🚀 ~ now:', now.hour());
  // Check if time already passed
  if (now.hour() >= expireHour) {
    setExpireHour += 24;
  } else if (now.minute() >= expireMinute) {
    setExpireMinute += 1;
  }

  console.log('🚀 ~ setExpireMinute:', setExpireMinute);

  const expireDate = now
    .hour(setExpireHour)
    .minute(setExpireMinute)
    .second(setExpireSecond);
  console.log('🚀 ~ useExpireDate ~ expireDate:', expireDate);
  const expireTime = expireDate.diff(now);
  console.log('🚀 ~ expireTime:', expireTime);

  return expireTime;
};

export const useExpireTimeout = ({ expireTime = 1000 }) => {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expireTime) {
      console.log('🚀 ~ useExpireDate ~ timeoutTime:', expireTime);
      const timeoutRef = setTimeout(() => {
        setExpired(true);
      }, expireTime);

      return () => {
        console.log('Clear timeout');
        clearTimeout(timeoutRef);
      };
    }
  }, [expireTime]);

  return expired;
};
