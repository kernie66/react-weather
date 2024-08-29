import { Group, Text } from '@mantine/core';
import {
  useDailyWeather,
  useTodaysWeather,
} from '../utils/weatherQueries.js';
import classes from '../css/Text.module.css';
import Marquee from 'react-fast-marquee';
import { useAtomValue } from 'jotai';
import {
  backgroundColorState,
  infoColorState,
} from '../atoms/weatherThemeStates.js';
import { useTranslation } from '../utils/translationQueries.js';
import { useEffect, useState } from 'react';

export default function SummaryBanner() {
  const infoColor = useAtomValue(infoColorState);
  const backgroundColor = useAtomValue(backgroundColorState);
  const { data: today } = useTodaysWeather();
  const { data: tomorrow } = useDailyWeather(1);
  const [translate, { data: translatedText }] = useTranslation('sv');
  const [todaySummary, setTodaySummary] = useState(
    'Vänta medan prognosen hämtas'
  );
  const [tomorrowSummary, setTomorrowSummary] = useState(
    'Vänta medan prognosen hämtas'
  );

  useEffect(() => {
    if (today) {
      translate(today.summary);
    }
    if (translatedText) {
      console.log('translatedText', translatedText);
      setTodaySummary(
        translatedText.data.translations[0].translatedText
      );
    }
  }, [today, translate, translatedText]);

  useEffect(() => {
    if (tomorrow) {
      translate(tomorrow.summary);
    }
    if (translatedText) {
      console.log('translatedText', translatedText);
      setTomorrowSummary(
        translatedText.data.translations[0].translatedText
      );
    }
  }, [tomorrow, translate, translatedText]);

  console.log('translatedText', translatedText);
  console.log('todaySummary', todaySummary);

  return (
    <Marquee autofill gradient gradientColor={backgroundColor}>
      <Group className={classes.outlineSingle} gap={8} w="125vw">
        <Text c={infoColor} fz={18}>
          Idag:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {todaySummary}
        </Text>
        <Text c={infoColor} fz={18}>
          Imorgon:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {tomorrowSummary}
        </Text>
      </Group>
    </Marquee>
  );
}
