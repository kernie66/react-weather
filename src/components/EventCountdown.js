import React, { useRef, useEffect, useState } from "react";
import Tick from "@pqina/flip";

export const EventCountdown = ({ value }) => {
  const divRef = useRef();
  const tickRef = useRef();
  const flipStyle = {
    fontFamily: 'Azeret Mono',
    fontSize: 36
  };

  const [tickValue, setTickValue] = useState(value);

  // Make the Tick instance and store it in the refs
  useEffect(() => {
    const didInit = tick => {
      tickRef.current = tick;
    };

    const currDiv = divRef.current;
    const tickValue = tickRef.current;
    Tick.DOM.create(currDiv, {
      value,
      didInit
    });
    return () => Tick.DOM.destroy(tickValue);
  }, [value]);

  // Start the Tick.down process
  useEffect(() => {
    const counter = Tick.count.down(value, {
      format: ["d", "h", "m", "s"]
    });

    // When the counter updates, update React's state value
    counter.onupdate = function (value) {
      setTickValue(value);
    };

    return () => {
//      console.log(counter);
      if (counter.timer) {
        counter.timer.stop();
      };
    };

  }, [value]);

  // When the tickValue is updated, update the Tick.DOM element
  useEffect(() => {
    if (tickRef.current) {
      tickRef.current.value = {
        days: tickValue[0],
        hours: tickValue[1],
        minutes: tickValue[2],
        seconds: tickValue[3]
      };
//      console.log(tickValue, tickValue[3]);
    }
  }, [tickValue]);

  return (
    <div style={flipStyle}>
      <div className="tick">
        <div data-repeat="true" data-layout="horizontal fit">
          <div className="tick-group">
            <div ref={divRef}>
              <span data-key="days" data-transform="pad(00)" data-view="flip" />
              <span className="tick-text-inline">:</span>
              <span
                data-key="hours"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay">
                <span
                  data-view="flip">
                </span>
              </span>
              <span className="tick-text-inline">::</span>
              <span
                data-key="minutes"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay">
                <span
                  data-view="flip">
                </span>
              </span>
              <span className="tick-text-inline">:</span>
              <span
                data-key="seconds"
                data-repeat="true"
                data-transform="pad(00) -> split -> delay">
                <span
                  data-view="flip">
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};