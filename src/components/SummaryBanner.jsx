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
  const [summaryTexts, setSummaryTexts] = useState([
    { text: '' },
    { text: '' },
  ]);

  useLogger('SummaryBanner', [{ summaryTexts }]);

  useEffect(() => {
    async function getTranslation(textToTranslate) {
      const translation = await translate(textToTranslate);
      const modifiedTranslation =
        translation[0].translatedText.replaceAll(
          ' klarning',
          ' uppklarnande'
        );
      console.log('modifiedTranslation', modifiedTranslation);
      return modifiedTranslation;
    }

    async function getTranslatedSummary() {
      if (!isEmpty(summaryArray)) {
        const firstText = await getTranslation(summaryArray[0].text);
        const newSummaryArray = [
          {
            time: summaryArray[0].time,
            text: firstText,
          },
        ];
        const secondText = await getTranslation(summaryArray[1].text);
        newSummaryArray.push({
          time: summaryArray[1].time,
          text: secondText,
        });
        setSummaryTexts(newSummaryArray);
      }
    }

    const summaryArray = prepareSummary(weeklyWeather);

    console.log('summaryArray', summaryArray);
    getTranslatedSummary();
  }, [weeklyWeather, translate]);

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
