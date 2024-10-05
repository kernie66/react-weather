import { Modal, Text } from '@mantine/core';
import { useTranslation } from '../hooks/translationQueries.js';
import { useEffect, useState } from 'react';
import { useWeatherOverview } from '../hooks/weatherOverviewQueries';

export default function WeatherOverviewModal({
  overviewOpened,
  closeOverview,
}) {
  const { data: weatherOverview } = useWeatherOverview();
  const translate = useTranslation('sv');
  const [date, setDate] = useState('idag');
  const [overview, setOverview] = useState('Vänta på sammanfattning');

  useEffect(() => {
    async function getTranslation(textToTranslate) {
      const translation = await translate(textToTranslate);
      const modifiedTranslation = translation[0].translatedText
        .replaceAll(' klarning', ' uppklarnande')
        .replaceAll('trasiga', 'brutna');
      return modifiedTranslation;
    }

    async function getTranslatedOverview() {
      const newOverview = await getTranslation(
        weatherOverview.weather_overview
      );
      setOverview(newOverview);
      setDate(weatherOverview.date);
    }

    console.log('weatherOverview', weatherOverview);
    if (weatherOverview) {
      getTranslatedOverview();
    }
  }, [weatherOverview, translate]);

  return (
    <Modal
      opened={overviewOpened}
      title={
        <Text fz={28} fw={500} c="blue.9">
          Väderöversikt för {date}
        </Text>
      }
      size="lg"
      onClose={closeOverview}
      centered
    >
      <Text fz={24} c="blue.7">
        {overview}
      </Text>
    </Modal>
  );
}
