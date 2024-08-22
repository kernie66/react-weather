import { Text } from '@mantine/core';
import classes from '../css/Text.module.css';

const getTemperatureValue = (temp) => {
  const positiveTemp = Math.abs(temp);
  let newIntegerTemp = Math.trunc(temp);
  let newDecimalTemp = Math.trunc(
    Math.round((positiveTemp - Math.trunc(positiveTemp)) * 10)
  ).toString();

  if (newDecimalTemp === '10') {
    newIntegerTemp += temp / positiveTemp;
    newDecimalTemp = '0';
  }

  return {
    integer: newIntegerTemp,
    decimal: newDecimalTemp,
  };
};

export default function TemperatureValue({
  tempValue,
  fontWeight = 500,
  fontSize = 128,
}) {
  const temperature = getTemperatureValue(tempValue);

  let outlineClass = classes.outlineSingle;

  if (fontSize > 50) {
    outlineClass = classes.outlineDouble;
  }
  return (
    <Text
      fw={fontWeight}
      fz={fontSize}
      className={outlineClass}
      ta="right"
    >
      {temperature.integer}
      <Text span fw={fontWeight} style={{ fontSize: '80%' }}>
        .{temperature.decimal}&deg;C
      </Text>
    </Text>
  );
}
