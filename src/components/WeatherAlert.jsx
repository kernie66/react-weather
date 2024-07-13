import {
  Button,
  Divider,
  Modal,
  Stack,
  Text,
  rem,
} from '@mantine/core';
import { useDisclosure, useId } from '@mantine/hooks';
import { TbAlertTriangle } from 'react-icons/tb';
import { useWeatherAlerts } from '../utils/weatherQueries.js';
import { useEffect, useState } from 'react';
import {
  hideNotification,
  showNotification,
} from '@mantine/notifications';
import dayjs from 'dayjs';

export default function WeatherAlert() {
  const [iconShown, { open: showIcon, close: hideIcon }] =
    useDisclosure(false);
  const [alertShown, { open: openAlert, close: closeAlert }] =
    useDisclosure(false);
  const notificationId = useId('notification-alert');
  const { data: weatherAlerts } = useWeatherAlerts();
  const [alertTimes, setAlertTimes] = useState({
    startTime: dayjs().format('LLLL'),
    endTime: dayjs().format('LLLL'),
  });

  useEffect(() => {
    let startTime = dayjs().format('LLLL');
    let endTime = dayjs().format('LLLL');

    if (weatherAlerts) {
      startTime = dayjs.unix(weatherAlerts[0].start).format('LLLL');
      endTime = dayjs.unix(weatherAlerts[0].end).format('LLLL');
      showIcon();
      console.log('notificationId', notificationId);
      showNotification({
        id: notificationId,
        title: 'Vädervarning: ' + weatherAlerts[0].event,
        message: (
          <Stack gap={4}>
            <Text size="sm" c="dodgerblue">
              Från: {startTime}
            </Text>
            <Text size="sm" c="dodgerblue">
              Till: {endTime}
            </Text>
            <Text size="sm" lineClamp={3}>
              {weatherAlerts[0].description}
            </Text>
          </Stack>
        ),
        color: 'orange',
        icon: (
          <TbAlertTriangle
            style={{ width: rem(18), height: rem(18) }}
          />
        ),
        autoClose: false,
      });
    } else {
      hideIcon();
      hideNotification(notificationId);
      closeAlert();
    }
    setAlertTimes({ startTime, endTime });
  }, [weatherAlerts, showIcon, hideIcon, notificationId, closeAlert]);

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
            Kategori: {weatherAlerts[0].event}
          </Text>
          <Text size="md" c="dodgerblue">
            Från: {alertTimes.startTime}
          </Text>
          <Text size="md" c="dodgerblue">
            Till: {alertTimes.endTime}
          </Text>
          <Divider />
          <Text size="md">{weatherAlerts[0].description}</Text>
          <Divider />
          <Text size="sm" fw={300}>
            Källa: {weatherAlerts[0].sender_name}
          </Text>
        </Stack>
      </Modal>
      <Button
        variant="transparent"
        size="xl"
        px={0}
        onClick={openAlertModal}
        hidden={!iconShown}
      >
        <TbAlertTriangle
          style={{
            width: rem(64),
            height: rem(64),
          }}
          color="orange"
        />
      </Button>
    </>
  );
}
