import { Text } from '@mantine/core';
import classes from '../css/Text.module.css';

export default function TemperatureValue({
  tempValue,
  fontWeight = 500,
  fontSize = 128,
}) {
  const positiveTemp = Math.abs(tempValue);
  const integerTemp = Math.trunc(tempValue);
  const decimalTemp = Math.trunc(
    Math.round((positiveTemp - Math.trunc(positiveTemp)) * 10)
  ).toString();

  let outlineClass = classes.outlineSm;

  if (fontSize > 50) {
    outlineClass = classes.outlineXl;
  }
  return (
    <Text
      fw={fontWeight}
      fz={fontSize}
      className={outlineClass}
      ta="right"
    >
      {integerTemp}
      <Text span fw={fontWeight} style={{ fontSize: '80%' }}>
        .{decimalTemp}&deg;C
      </Text>
    </Text>
  );
}
