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
import { Fragment, useEffect, useState } from 'react';
import { isEmpty } from 'radash';
import { useLogger } from '@mantine/hooks';
import { prepareSummary } from '../helpers/prepareSummary.js';
import { DAYS, isAlmostTomorrow } from '../helpers/getDay.js';

export default function SummaryBanner() {
  const infoColor = useAtomValue(infoColorState);
  const backgroundColor = useAtomValue(backgroundColorState);
  const { data: weeklyWeather } = useWeeklyWeather();
  const translate = useTranslation('sv');
  const [summaryTexts, setSummaryTexts] = useState([]);

  useLogger('SummaryBanner', [{ summaryTexts }]);

  useEffect(() => {
    async function getTranslation(textToTranslate, dayConcerned) {
      const translation = await translate(textToTranslate);
      const regexp = /(upp)?klarning/gi;
      let modifiedTranslation =
        translation[0].translatedText.replaceAll(
          regexp,
          'uppklarnande'
        );

      if (dayConcerned === DAYS[1]) {
        modifiedTranslation = modifiedTranslation.replaceAll(
          'idag',
          'imorgon'
        );
      }
      return modifiedTranslation;
    }

    async function getTranslatedSummary() {
      if (!isEmpty(summaryArray)) {
        const newSummaryTexts = await Promise.all(
          summaryArray.map(async (summary) => {
            const translatedText = await getTranslation(
              summary.text,
              summary.day
            );
            return {
              day: summary.day,
              text: translatedText,
            };
          })
        );
        setSummaryTexts(newSummaryTexts);
      }
    }

    const startDay = isAlmostTomorrow() ? 1 : 0;
    const summaryArray = prepareSummary(weeklyWeather, startDay);
    console.log('summaryArray', summaryArray);
    getTranslatedSummary();
  }, [weeklyWeather, translate]);

  if (!weeklyWeather) {
    console.log('Render wait text while waiting for weather data');
    return (
      <Text c="gray.0" fz={20}>
        Väntar på väderdata
      </Text>
    );
  }

  console.log('Rendering summary');
  return (
    <Marquee autofill gradient gradientColor={backgroundColor}>
      <Group className={classes.outlineSingle} gap={8} me="xl">
        {summaryTexts.map((summaryText) => {
          return (
            <Fragment key={summaryText.day}>
              <Text c={infoColor} fz={20}>
                {summaryText.day}:
              </Text>
              <Text c="gray.0" fz={20} pe="xl">
                {summaryText.text}
              </Text>
            </Fragment>
          );
        })}
      </Group>
    </Marquee>
  );
}
