import React, { useRef, useEffect, useState } from "react";
import Tick from "@pqina/flip";
import getFlipValues from "../helpers/getFlipValues";

export default function FlipDate() {
  const divRef = useRef();
  const tickRef = useRef();
  const [tickValue, setTickValue] = useState(getFlipValues());
  const [flipDayStyle, setFlipDayStyle] = useState("flip-date-day");

  // Make the Tick instance and store it in the refs
  useEffect(() => {
    const didInit = tick => {
      tickRef.current = tick;
      tickRef.current.value = getFlipValues();
      console.debug("Tick initialised");
    };

    const currDiv = divRef.current;
    const tickInstance = tickRef.current;
    Tick.DOM.create(currDiv, {
      didInit
    });
    return () => Tick.DOM.destroy(tickInstance);
  }, []);

  // Set up a timer
  useEffect(() => {
    const timerId = setInterval(() => {
      const value = getFlipValues();

      if (tickRef.current.value.minutes !== value.minutes) {
        setTickValue(value);
      };
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // When the tickValue is updated, update the Tick.DOM element
  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = tickValue;
      setFlipDayStyle(tickValue.dayOfWeek === 0 ? "flip-date-sunday" : "flip-date-day");
    }
  }, [tickValue]);

  return (
    <div style={{ fontFamily: 'Azeret Mono', fontSize: '36px' }}>
      <div className="tick">
        <div data-repeat="true">
          <div ref={divRef}>
            <div className="tick-group">
              <span
                data-key="hours"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay">
                <span
                  data-view="flip">
                </span>
              </span>
              <span className="tick-text-inline">:</span>
              <span
                data-key="minutes"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay">
                <span
                  data-view="flip">
                </span>
              </span>
              <div className="mt-3">
                <span
                  data-key="weekday"
                  id="flip-date"
                  data-view="flip">
                </span>
                <span
                  data-key="day"
                  id={flipDayStyle}
                  data-view="flip"
                  data-transform="pad(00)">
                </span>
                <span
                  data-key="month"
                  id="flip-date"
                  data-view="flip">
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};