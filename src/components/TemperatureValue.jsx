import { Text } from '@mantine/core';
import classes from '../css/Text.module.css';
import { useEffect, useState } from 'react';

export default function TemperatureValue({
  tempValue,
  fontWeight = 500,
  fontSize = 128,
}) {
  const [integerTemp, setIntegerTemp] = useState(20);
  const [decimalTemp, setDecimalTemp] = useState('0');

  useEffect(() => {
    const positiveTemp = Math.abs(tempValue);
    let newIntegerTemp = Math.trunc(tempValue);
    let newDecimalTemp = Math.trunc(
      Math.round((positiveTemp - Math.trunc(positiveTemp)) * 10)
    ).toString();

    if (newDecimalTemp === '10') {
      newIntegerTemp += tempValue / positiveTemp;
      newDecimalTemp = '0';
    }
    setIntegerTemp(newIntegerTemp);
    setDecimalTemp(newDecimalTemp);
  }, [tempValue]);

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
      {integerTemp}
      <Text span fw={fontWeight} style={{ fontSize: '80%' }}>
        .{decimalTemp}&deg;C
      </Text>
    </Text>
  );
}
