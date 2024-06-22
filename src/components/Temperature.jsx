import TemperatureValue from './TemperatureValue.jsx';

export default function Temperature() {
  return (
    <TemperatureValue
      tempValue={-22.1}
      fontWeight={500}
      tempClass="outline-temp"
    />
  );
}
