import React, { useRef, useEffect, useState } from "react";
import Tick from "@pqina/flip";

export default function FlipDate() {
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
  const divRef = useRef();
  const tickRef = useRef();
  const [tickValue, setTickValue] = useState(timeFormat.format(new Date().getTime()));
  const [, setUpdate] = useState(0);

  // Make the Tick instance and store it in the refs
  useEffect(() => {
    const didInit = tick => {
      tickRef.current = tick;
      tickRef.current.value = tickValue;
      console.debug("Tick initialised", tickValue);
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
      setUpdate(update => update + 1);
      console.log("Timer event");

      const time = Tick.helper.date();
      let value = {
        sep: ':',
        hours: time.getHours(),
        minutes: time.getMinutes(),
        date: time.getDate(),
        month: time.getMonth(),
        day: time.getDay()
      };
      console.log(time, value.hours, value.sep, value.minutes);
      setTickValue(value);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  /*
    // Start the Tick.down process
    useEffect(() => {
      const counter = Tick.count.down(value, {
        format: ["h", "m", "s"]
      });
  
      // When the counter updates, update React's state value
      counter.onupdate = function(value) {
        setTickValue(value);
      };
  
      return () => {
        counter.timer.stop();
      };
    }, [value]);
  */
  /*
   useEffect(() => {
     const offset = new Date();
     const timeDuration = Tick.helper.duration(24, "hours");
     const time = Tick.helper.date();
     let value1 = {
       sep: ':',
       hours: time.getHours(),
       minutes: time.getMinutes(),
       date: time.getDate(),
       month: time.getMonth(),
       day: "{{ day }}"
     };
     console.log(value1.month, time);
 
     // add 24 hours to get final deadline
     const deadline = new Date(
       offset.setMilliseconds(offset.getMilliseconds() + timeDuration)
     );
 
     const counter = Tick.count.down(deadline, {
       format: ["d", "h", "m", "s"]
     });
 
     // When the counter updates, update React's state value
     counter.onupdate = function (value) {
       setTickValue(value);
       console.log(value);
     };
     /*
             return () => {
               counter.timer.stop();
             };
     
   }, []);
 */
  // When the tickValue is updated, update the Tick.DOM element
  useEffect(() => {
    if (tickRef.current) {
      console.log(tickValue.hours, "Setting tick value FlipDate");
      tickRef.current.value = tickValue;
      /*
            {
              hours: tickValue.hours,
              minutes: tickValue.minutes,
              seconds: tickValue.seconds
            };
      */
    }
  }, [tickValue]);
  /*
    useEffect(() => {
      if (tickRef.current) {
        tickRef.current.value = tickValue;
      }
    }, [tickValue]);
  */
  return (
    <div style={{ fontFamily: 'Azeret Mono', fontSize: '45px' }}>
      <div className="tick">
        <div data-repeat="true" data-layout="horizontal fit">
          <div className="tick-group">
            <div ref={divRef}>
              <span
                data-key="hours"
                data-transform="pad(00)"
                data-view="flip"
              />
              <span className="tick-text-inline">:</span>
              <span
                data-key="minutes"
                data-transform="pad(00)"
                data-view="flip"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
/*

<div class="tick" data-did-init="handleTickInit">
    <div data-layout="vertical">
        <div data-layout="horizontal">
            <span data-key="hours" data-repeat="true" data-transform="pad(00) -> split -> delay">
                <span data-view="flip"></span>
            </span>
            <span data-view="text" data-key="sep" class="tick-text-inline"></span>
            <span data-key="minutes" data-repeat="true" data-transform="pad(00) -> split -> delay">
                <span data-view="flip"></span>
            </span>
        </div>
        <div data-layout="horizontal">
            <span data-key="day" id="date-flip" data-view="flip">
            </span>
            <span data-key="date" id="date-flip2" data-view="flip" data-transform="pad(00)">
            </span>
            <span data-key="month" id="date-flip" data-view="flip">
            </span>
        </div>
    </div>
</div>

<script>
    function handleTickInit(tick) {

        // start interval (default is 1 second) and update clock with current time
        Tick.helper.interval(function(){
            var d = Tick.helper.date();
            tick.value = {
                sep: ':',
                hours: d.getHours(),
                minutes: d.getMinutes(),
                date: d.getDate(),
                month: "{{ month }}",
                day: "{{ day }}"
            };
        }, 10000);
    }
</script>
*/