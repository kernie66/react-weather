import { Group, Image, Stack, Text } from '@mantine/core';
import { getWeatherIconUrl } from '../helpers/getImageUrl.js';
import { useCurrentWeather } from '../hooks/weatherQueries.js';
import { capitalize } from 'radash';
import { getRainInfo } from '../helpers/getRainInfo.js';
import classes from '../css/Text.module.css';

export default function CurrentWeather() {
  const { data: currentWeather } = useCurrentWeather();

  const description = capitalize(
    currentWeather.weather[0].description
  );

  const weatherIcon = getWeatherIconUrl(
    currentWeather.weather[0].id,
    currentWeather.weather[0].icon,
    currentWeather.moonPhase
  );

  const rainInfo = getRainInfo(currentWeather);

  return (
    <Group gap="md">
      <Image
        src={weatherIcon}
        width="80px"
        height="80px"
        alt="Väder"
      />
      <Stack align="center" maw={310}>
        <Text
          className={classes.outlineSingle}
          fz={36}
          c="indigo.1"
          lineClamp={2}
        >
          {description}
        </Text>
        <Text
          className={classes.outlineSingle}
          fz={24}
          c={rainInfo.color}
        >
          {rainInfo.text}
          {rainInfo.pop !== '' ? (
            <Text span>&nbsp;{rainInfo.pop}</Text>
          ) : null}
        </Text>
      </Stack>
    </Group>
  );
}
