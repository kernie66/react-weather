import { useEffect, useState } from 'react';

export const useExpireTimeout = ({ expireTime = 1000 }) => {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (expireTime) {
      console.log('🚀 ~ useExpireDate ~ timeoutTime:', expireTime);
      const timeoutRef = setTimeout(() => {
        setExpired(true);
      }, expireTime);

      return () => {
        clearTimeout(timeoutRef);
      };
    }
  }, [expireTime]);

  return expired;
};
