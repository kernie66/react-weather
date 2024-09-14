import { Modal, Text, Title } from '@mantine/core';
import { useWeatherOverview } from '../hooks/weatherQueries.js';
import { useTranslation } from '../hooks/translationQueries.js';
import { useEffect, useState } from 'react';

export default function WeatherOverviewModal({
  overviewOpened,
  closeOverview,
}) {
  const { data: weatherOverview } = useWeatherOverview();
  const translate = useTranslation('sv');
  const [date, setDate] = useState('idag');
  const [overview, setOverview] = useState('Vänta på sammanfattning');
  console.log('weatherOverview', weatherOverview);

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

    getTranslatedOverview();
  }, [weatherOverview, translate]);

  return (
    <Modal
      opened={overviewOpened}
      title={
        <Title order={3} c="blue.9">
          Väderöversikt för {date}
        </Title>
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
