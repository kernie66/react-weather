import {
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { getWeatherIconUrl } from '../helpers/getImageUrl.js';
import { useMemo } from 'react';
import dayjs from 'dayjs';

export default function Forecast(props) {
  //hourlyWeather, moonPhase) {

  const hourlyWeather = props.hourlyWeather;
  const moonPhase = props.moonPhase;
  console.log('hourlyWeather', hourlyWeather);

  const weatherIcon = useMemo(
    () =>
      getWeatherIconUrl(
        hourlyWeather.weather[0].id,
        hourlyWeather.weather[0].icon,
        moonPhase
      ),
    [hourlyWeather, moonPhase]
  );
  const forecastTime = dayjs.unix(hourlyWeather.dt).format('HH:mm');
  const forecastTime2 = dayjs().calendar(forecastTime);
  console.log('forecastTime2', forecastTime2);
  const forecastTemp = Math.round(hourlyWeather.temp);
  let forecastRain = 'Uppehåll';
  if (hourlyWeather.rain) {
    forecastRain =
      hourlyWeather.rain['1h'].toFixed(1).toString() + ' mm/h';
  }

  return (
    <Paper
      bg="rgba(74, 127, 169, 0.8)"
      radius="md"
      shadow="lg"
      miw="12vw"
      mih="12vh"
    >
      <Stack align="center" justify="space-around" gap={4} my={4}>
        <Text className="outline-sm">{forecastTime}</Text>
        <Center>
          <Group gap="sm" justify="center">
            <Image
              src={weatherIcon}
              width="46px"
              height="46px"
              alt="Halvklart"
            />
            <Text className="outline-temp-sm">
              {forecastTemp}&deg;C
            </Text>
          </Group>
        </Center>
        <Text className="outline-sm" c="paleturquoise">
          {forecastRain}
        </Text>
      </Stack>
    </Paper>
  );
}
