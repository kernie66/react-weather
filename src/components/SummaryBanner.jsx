import { Group, Text } from '@mantine/core';
import { useWeeklyWeather } from '../hooks/weatherQueries.js';
import classes from '../css/Text.module.css';
import Marquee from 'react-fast-marquee';
import { useAtomValue } from 'jotai';
import {
  backgroundColorState,
  infoColorState,
} from '../atoms/weatherThemeStates.js';
import { useTranslation } from '../hooks/translationQueries.js';
import { useEffect, useState } from 'react';
import { isEmpty } from 'radash';
import { useLogger } from '@mantine/hooks';

const prepareSummary = (weatherArray, start = 0, number = 2) => {
  let summaryArray = [];
  for (let i = start; i < start + number; i++) {
    summaryArray.push({
      text: weatherArray[i].summary,
      time: weatherArray[i].dt,
    });
  }
  return summaryArray;
};

export default function SummaryBanner() {
  const infoColor = useAtomValue(infoColorState);
  const backgroundColor = useAtomValue(backgroundColorState);
  const { data: weeklyWeather } = useWeeklyWeather();
  const translate = useTranslation('sv');
  const [summaryArray, setSummaryArray] = useState([]);
  const [summaryTexts, setSummaryTexts] = useState([
    { text: '' },
    { text: '' },
  ]);

  useLogger('SummaryBanner', [{ summaryTexts }]);

  useEffect(() => {
    const newSummaryArray = prepareSummary(weeklyWeather);
    console.log('newSummaryArray', newSummaryArray);
    setSummaryArray(newSummaryArray);
  }, [weeklyWeather]);

  useEffect(() => {
    async function getTranslation(index = 0) {
      const translations = await translate(summaryArray[index].text);
      let newSummaryTexts = summaryTexts;
      newSummaryTexts[index] = {
        time: summaryArray[index].time,
        text: translations[0].translatedText.replaceAll(
          ' klarning',
          ' uppklarnande'
        ),
      };
      console.log('newSummaryTexts', newSummaryTexts);
      setSummaryTexts(newSummaryTexts);
      return true;
    }

    console.log('summaryArray', summaryArray);
    if (!isEmpty(summaryArray)) {
      console.log('Translate start');
      getTranslation(0);
      getTranslation(1);
      console.log('Translate stop');
    }
  }, [summaryArray, summaryTexts, translate]);

  useEffect(() => {
    console.log('useEffect summaryTexts', summaryTexts);
  }, [summaryTexts]);

  return (
    <Marquee autofill gradient gradientColor={backgroundColor}>
      <Group className={classes.outlineSingle} gap={8} me="xl">
        <Text c={infoColor} fz={18}>
          Idag:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {summaryTexts[0].text}
        </Text>
        <Text c={infoColor} fz={18}>
          Imorgon:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {summaryTexts[1].text}
        </Text>
      </Group>
    </Marquee>
  );
}
