import { List } from 'reactstrap';

export default function Forecast() {
  const forecastStyle = {
    backgroundColor: "rgba(30, 143, 255, 0.74)",
    borderRadius: ".5em",
    minWidth: "12vw", 
    minHeight: "13vh",
    margin: ".5em",
  };

  return (
    <div style={forecastStyle}>
    <List type='unstyled' className='outline-sm text-center m-1'>
      <li className='pb-1'>Idag 12:00</li>
      <li className="outline-temp-sm pb-0">
        <img src="weather_icons/PNG/128/night_full_moon_partial_cloud.png" width="50px" height="50px"
          alt="Halvklart" />
        &nbsp;23.5&deg;
      </li>
      <li style={{ color: "dodgerblue" }}>
        2.3 mm
      </li>
    </List>
    </div>
  );
};