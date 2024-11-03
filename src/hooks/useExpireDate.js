import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const useExpireDate = ({
  expireHour,
  expireMinute = 0,
  expireSecond = 0,
}) => {
  const [expired, setExpired] = useState(false);
  const [timeoutTime, setTimeoutTime] = useState();

  useEffect(() => {
    const now = dayjs();
    console.log('🚀 ~ useExpireDate ~ now:', now);
    let setExpireHour = expireHour % 24 || now.hour();
    let setExpireMinute = expireMinute % 60;
    let setExpireSecond = expireSecond % 60;

    console.log('🚀 ~ now:', now.hour());
    // Check if time already passed
    if (now.hour() >= expireHour) {
      setExpireHour += 24;
    }

    console.log('🚀 ~ setExpireMinute:', setExpireMinute);

    const expireDate = now
      .hour(setExpireHour)
      .minute(setExpireMinute)
      .second(setExpireSecond);
    console.log('🚀 ~ useExpireDate ~ expireDate:', expireDate);
    setTimeoutTime(expireDate.diff(now));
  }, [expireHour, expireMinute, expireSecond]);

  useEffect(() => {
    if (timeoutTime) {
      console.log('🚀 ~ useExpireDate ~ timeoutTime:', timeoutTime);
      const timeoutRef = setTimeout(() => {
        setExpired(true);
      }, timeoutTime);

      return () => {
        console.log('Clear timeout');
        clearTimeout(timeoutRef);
      };
    }
  }, [timeoutTime]);

  return expired;
};

export default useExpireDate;
