import {
  Box,
  Button,
  Divider,
  Modal,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure, useId } from '@mantine/hooks';
import { TbAlertTriangle } from 'react-icons/tb';
import { useWeatherAlerts } from '../hooks/weatherQueries.js';
import { useEffect, useState } from 'react';
import {
  hideNotification,
  showNotification,
} from '@mantine/notifications';
import dayjs from 'dayjs';
import { useTranslation } from '../hooks/translationQueries.js';

const alertTimes = {
  startTime: dayjs().format('LLLL'),
  endTime: dayjs().format('LLLL'),
};

export default function WeatherAlert() {
  const [iconShown, { open: showIcon, close: hideIcon }] =
    useDisclosure(false);
  const [alertShown, { open: openAlert, close: closeAlert }] =
    useDisclosure(false);
  const notificationId = useId('notification-alert');
  const { data: weatherAlerts } = useWeatherAlerts();
  const [alertEvent, setAlertEvent] = useState('Okänd');
  const [alertDescription, setAlertDescription] = useState('');
  const translate = useTranslation('sv');

  useEffect(() => {
    let modifiedAlertDescription = '';
    async function getTranslation(textToTranslate) {
      const translation = await translate(textToTranslate);
      const modifiedTranslation = translation[0].translatedText
        .replaceAll(' klarning', ' uppklarnande')
        .replaceAll('trasiga', 'brutna');
      return modifiedTranslation;
    }

    async function getTranslatedAlerts() {
      const newAlertEventText = await getTranslation(
        weatherAlerts[0].event
      );
      const newAlertDescriptionText = await getTranslation(
        modifiedAlertDescription
      );
      setAlertEvent(newAlertEventText);
      setAlertDescription(newAlertDescriptionText);
    }

    if (weatherAlerts) {
      alertTimes.startTime = dayjs
        .unix(weatherAlerts[0].start)
        .format('LLLL');
      alertTimes.endTime = dayjs
        .unix(weatherAlerts[0].end)
        .format('LLLL');
      const regex = /; /g;
      modifiedAlertDescription = weatherAlerts[0].description.replace(
        regex,
        '\n'
      );

      getTranslatedAlerts();

      showIcon();
    } else {
      hideIcon();
      hideNotification(notificationId);
      closeAlert();
    }
  }, [
    weatherAlerts,
    showIcon,
    hideIcon,
    notificationId,
    closeAlert,
    translate,
  ]);

  useEffect(() => {
    if (alertEvent !== 'Okänd') {
      showNotification({
        id: notificationId,
        title: 'Vädervarning: ' + alertEvent,
        message: (
          <Stack gap={4}>
            <Text size="sm" c="dodgerblue">
              Från: {alertTimes.startTime}
            </Text>
            <Text size="sm" c="dodgerblue">
              Till: {alertTimes.endTime}
            </Text>
            <Text
              size="sm"
              lineClamp={3}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {alertDescription}
            </Text>
          </Stack>
        ),
        color: 'orange',
        withBorder: true,
        icon: (
          <TbAlertTriangle
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        autoClose: false,
      });
    }
  }, [alertDescription, alertEvent, notificationId]);

  const openAlertModal = () => {
    hideNotification(notificationId);
    openAlert();
  };

  return (
    <>
      <Modal
        opened={alertShown}
        title="Vädervarning"
        onClose={closeAlert}
        size="lg"
      >
        <Stack gap="xs">
          <Divider />
          <Text size="md" fw={500} c="dodgerblue">
            Kategori: {alertEvent}
          </Text>
          <Text size="md" c="dodgerblue">
            Från: {alertTimes.startTime}
          </Text>
          <Text size="md" c="dodgerblue">
            Till: {alertTimes.endTime}
          </Text>
          <Divider />
          <Text size="md" style={{ whiteSpace: 'pre-wrap' }}>
            {alertDescription}
          </Text>
          <Divider />
          <Text size="sm" fw={300}>
            Källa: {weatherAlerts ? weatherAlerts[0].sender_name : ''}
          </Text>
        </Stack>
      </Modal>
      <Box className="weather-alert--box" miw={64}>
        {iconShown ? (
          <Button
            variant="transparent"
            size="xl"
            px={0}
            onClick={openAlertModal}
          >
            <TbAlertTriangle
              style={{
                width: rem(64),
                height: rem(64),
              }}
              color="orange"
            />
          </Button>
        ) : null}
      </Box>
    </>
  );
}
