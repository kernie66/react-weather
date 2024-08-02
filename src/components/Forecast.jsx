import {
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { getWeatherIconUrl } from '../helpers/getImageUrl.js';
import { useEffect, useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { capitalize } from 'radash';
import { getRainInfo } from '../helpers/getRainInfo.js';
import classes from '../css/Text.module.css';

export default function Forecast({ hourlyWeather, moonPhase }) {
  const [forecast, setForecast] = useState({
    text: '',
    temp: '',
  });
  const [rainInfo, setRainInfo] = useState(
    getRainInfo(hourlyWeather)
  );

  const weatherIcon = useMemo(
    () =>
      getWeatherIconUrl(
        hourlyWeather.weather[0].id,
        hourlyWeather.weather[0].icon,
        moonPhase
      ),
    [hourlyWeather, moonPhase]
  );

  useEffect(() => {
    const forecastTime = dayjs.unix(hourlyWeather.dt);
    let isToday = 'Idag';
    if (!dayjs().isSame(dayjs.unix(hourlyWeather.dt), 'day')) {
      isToday = capitalize(dayjs(forecastTime).format('ddd'));
    }

    const forecastText =
      isToday + dayjs(forecastTime).format(' HH:mm');

    const forecastTemp = Math.round(hourlyWeather.temp);
    const forecastRainInfo = getRainInfo(hourlyWeather);

    setForecast({
      text: forecastText,
      temp: forecastTemp,
    });
    setRainInfo(forecastRainInfo);
  }, [hourlyWeather]);

  return (
    <Paper
      bg="rgba(74, 127, 169, 0.8)"
      radius="md"
      shadow="lg"
      miw="12vw"
      mih="12vh"
    >
      <Stack align="center" justify="space-around" gap={4} my={4}>
        <Text className={classes.outlineSingle} fz={18} c="indigo.1">
          {forecast.text}
        </Text>
        <Center>
          <Group gap="sm" justify="center">
            <Image
              src={weatherIcon}
              width="46px"
              height="46px"
              alt="Halvklart"
            />
            <Text
              className={classes.outlineSingle}
              fz={28}
              c="orange.4"
            >
              {forecast.temp}&deg;C
            </Text>
          </Group>
        </Center>
        <Text
          className={classes.outlineSingle}
          fz={18}
          c={rainInfo.color}
        >
          {rainInfo.text}
          {rainInfo.pop !== '' ? (
            <Text span>&nbsp;{rainInfo.pop}</Text>
          ) : null}
        </Text>
      </Stack>
    </Paper>
  );
}
