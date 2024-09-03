import { Group, Text } from '@mantine/core';
import { useWeeklyWeather } from '../utils/weatherQueries.js';
import classes from '../css/Text.module.css';
import Marquee from 'react-fast-marquee';
import { useAtomValue } from 'jotai';
import {
  backgroundColorState,
  infoColorState,
} from '../atoms/weatherThemeStates.js';
import { useTranslation } from '../utils/translationQueries.js';
import { useEffect, useState } from 'react';
import { isEmpty } from 'radash';

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
  const [summaryTexts, setSummaryTexts] = useState(['', '']);

  useEffect(() => {
    const newSummaryArray = prepareSummary(weeklyWeather);
    console.log('newSummaryArray', newSummaryArray);
    setSummaryArray(newSummaryArray);
  }, [weeklyWeather]);

  useEffect(() => {
    async function getTranslation(index = 0) {
      const translations = await translate(summaryArray[index].text);
      let newSummaryTexts = summaryTexts;
      newSummaryTexts[index] = translations[0].translatedText;
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

  /*
  useEffect(() => {
    let mounted = true;
    let newState = state;

    if (translations) {
      let newSummaryTexts = summaryTexts;
      newSummaryTexts[state] = translations[0].translatedText;

      if (state < 1) {
        newState += 1;
      } else {
        newState = null;
      }

      if (mounted) {
        setSummaryTexts(newSummaryTexts);
        setState(newState);
      }
    }

    return () => (mounted = false);
  }, [state, translations, summaryTexts]);

  /*
  useEffect(() => {
    if (today?.summary) {
      console.log('today', today);
      translate(today.summary);
    }
    if (translations) {
      console.log('translatedText', translations);
      setTodaySummary(translations[0].translatedText);
    }
  }, [today, translate, translations]);
  */

  return (
    <Marquee autofill gradient gradientColor={backgroundColor}>
      <Group className={classes.outlineSingle} gap={8} w="125vw">
        <Text c={infoColor} fz={18}>
          Idag:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {summaryTexts[0]}
        </Text>
        <Text c={infoColor} fz={18}>
          Imorgon:
        </Text>
        <Text c="gray.0" fz={18} pe="xl">
          {summaryTexts[1]}
        </Text>
      </Group>
    </Marquee>
  );
}
