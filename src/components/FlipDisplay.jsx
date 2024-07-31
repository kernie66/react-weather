import { useRef, useEffect, useState } from 'react';
import Tick from '@pqina/flip';
import getFlipValues from '../helpers/getFlipValues';
import { Box } from '@mantine/core';

export default function FlipDisplay() {
  const divRef = useRef();
  const tickRef = useRef();
  const [tickValue, setTickValue] = useState(getFlipValues());
  const [flipDayStyle, setFlipDayStyle] = useState('flip-date-day');

  // Make the Tick instance and store it in the refs
  useEffect(() => {
    const didInit = (tick) => {
      tickRef.current = tick;
      tickRef.current.value = getFlipValues();
      console.debug('Tick initialised');
    };

    const currDiv = divRef.current;
    const tickInstance = tickRef.current;
    Tick.DOM.create(currDiv, {
      didInit,
    });
    return () => Tick.DOM.destroy(tickInstance);
  }, []);

  // Set up a timer
  useEffect(() => {
    const timerId = setInterval(() => {
      const value = getFlipValues();

      if (tickRef.current.value.minutes !== value.minutes) {
        setTickValue(value);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // When the tickValue is updated, update the Tick.DOM element
  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = tickValue;
      setFlipDayStyle(
        tickValue.dayOfWeek === 0
          ? 'flip-date-sunday'
          : 'flip-date-day'
      );
    }
  }, [tickValue]);

  return (
    <Box className="tick FlipDisplay" miw={260} mih={125}>
      <div data-repeat="true">
        <div ref={divRef}>
          <Box className="tick-group FlipTime">
            <span
              data-key="hours"
              data-repeat="true"
              data-transform="pad(00) -> split -> delay"
            >
              <span data-view="flip"></span>
            </span>
            <span className="tick-text-inline">:</span>
            <span
              data-key="minutes"
              data-repeat="true"
              data-transform="pad(00) -> split -> delay"
            >
              <span data-view="flip"></span>
            </span>
            <Box className="FlipDate" mt={8}>
              <span
                data-key="weekday"
                id="flip-date"
                data-view="flip"
              ></span>
              <span
                data-key="day"
                id={flipDayStyle}
                data-view="flip"
                data-transform="pad(00)"
              ></span>
              <span
                data-key="month"
                id="flip-date"
                data-view="flip"
              ></span>
            </Box>
          </Box>
        </div>
      </div>
    </Box>
  );
}
