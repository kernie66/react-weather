import TemperatureValue from './TemperatureValue.jsx';

export default function Temperature() {
  return (
    <TemperatureValue
      tempValue={2.1}
      fontWeight={500}
      tempClass="outline-temp"
    />
  );
}
