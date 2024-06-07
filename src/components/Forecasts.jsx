import Forecast from "./Forecast";

export default function Forecasts() {
  const forecasts = [];

  for (let i = 0; i < 12; i++) {
    forecasts.push(i.toString());
  };

  return (
    forecasts.map(forecast => <Forecast key={forecast} />)
  );
};