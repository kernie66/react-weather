import { useAtomValue } from 'jotai';
import { Button, Text, Title } from '@mantine/core';
import { weatherThemeState } from '../../../atoms/weatherThemeStates.js';

export default function GetFakeWeatherTheme() {
  const weatherTheme = useAtomValue(weatherThemeState);

  return (
    <>
      <Title order={2}>Current fake weather theme is:</Title>
      <Text>Background image:</Text>
      <Button>{weatherTheme.backgroundImage}</Button>
      <Text>Info color:</Text>
      <Button>{weatherTheme.infoColor}</Button>
      <Text>Temperature color:</Text>
      <Button>{weatherTheme.tempColor}</Button>
    </>
  );
}
