import { Text } from '@mantine/core';

export default function TemperatureValue({
  tempValue,
  fontWeight = 500,
  tempClass,
}) {
  const positiveTemp = Math.abs(tempValue);
  const integerTemp = Math.trunc(tempValue);
  const decimalTemp = Math.trunc(
    Math.round((positiveTemp - Math.trunc(positiveTemp)) * 10)
  ).toString();

  return (
    <Text fw={fontWeight} className={tempClass} ta="right">
      {integerTemp}
      <span fw={fontWeight} style={{ fontSize: '80%' }}>
        .{decimalTemp}&deg;C
      </span>
    </Text>
  );
}
