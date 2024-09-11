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
import { prepareSummary } from '../helpers/prepareSummary.js';

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
      return modifiedTranslation;
    }

    async function getTranslatedSummary() {
      if (!isEmpty(summaryArray)) {
        const newSummaryTexts = await Promise.all(
          summaryArray.map(async (summary) => {
            const translatedText = await getTranslation(summary.text);
            return {
              time: summary.time,
              text: translatedText,
            };
          })
        );
        setSummaryTexts(newSummaryTexts);
      }
    }

    const summaryArray = prepareSummary(weeklyWeather);
    getTranslatedSummary();
  }, [weeklyWeather, translate]);

  return (
    <Marquee autofill gradient gradientColor={backgroundColor}>
      <Group className={classes.outlineSingle} gap={8} me="xl">
        <Text c={infoColor} fz={20}>
          Idag:
        </Text>
        <Text c="gray.0" fz={20} pe="xl">
          {summaryTexts[0].text}
        </Text>
        <Text c={infoColor} fz={20}>
          Imorgon:
        </Text>
        <Text c="gray.0" fz={20} pe="xl">
          {summaryTexts[1].text}
        </Text>
      </Group>
    </Marquee>
  );
}
