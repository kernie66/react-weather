import {
  Center,
  Group,
  Image,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { getWeatherIconUrl } from '../helpers/getImageUrl.js';
import dayjs from 'dayjs';
import { getRainInfo } from '../helpers/getRainInfo.js';
import classes from '../css/Text.module.css';
import { useAtomValue } from 'jotai';
import {
  backgroundColorState,
  infoColorState,
} from '../atoms/weatherThemeStates';
import { getDayText } from '../helpers/getDay.js';

const getForecast = (weather) => {
  const forecastTime = dayjs.unix(weather.dt);
  const dayText = getDayText(forecastTime);

  const forecastText = dayText + dayjs(forecastTime).format(' HH:mm');

  const forecastTemp = Math.round(weather.temp);

  return {
    text: forecastText,
    temp: forecastTemp,
  };
};

export default function Forecast({ hourlyWeather, moonPhase }) {
  const infoColor = useAtomValue(infoColorState);
  const backgroundColor = useAtomValue(backgroundColorState);

  const weatherIcon = getWeatherIconUrl(
    hourlyWeather.weather[0].id,
    hourlyWeather.weather[0].icon,
    moonPhase
  );

  const forecast = getForecast(hourlyWeather);
  const forecastRainInfo = getRainInfo(hourlyWeather);

  return (
    <Paper
      bg={backgroundColor}
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
              fw={500}
              c={infoColor}
            >
              {forecast.temp}&deg;C
            </Text>
          </Group>
        </Center>
        <Text
          className={classes.outlineSingle}
          fz={18}
          c={forecastRainInfo.color}
        >
          {forecastRainInfo.text}
          {forecastRainInfo.pop !== '' ? (
            <Text span>&nbsp;{forecastRainInfo.pop}</Text>
          ) : null}
        </Text>
      </Stack>
    </Paper>
  );
}
