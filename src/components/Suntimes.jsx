import {
  Divider,
  Group,
  Modal,
  Stack,
  Table,
  UnstyledButton,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useWeatherPosition } from '../utils/weatherQueries.js';
import { getSunTimes } from '../helpers/getSunInfo.js';
import SunIcon from './SunIcon.jsx';
import { useDisclosure } from '@mantine/hooks';
import { getSunTimeTable } from '../helpers/getSunTimeTable.js';

export default function SunTimes() {
  const { data: position } = useWeatherPosition();
  const [sunInfoOpened, { open: openSunInfo, close: closeSunInfo }] =
    useDisclosure(false);

  const { sunriseTime, sunsetTime, afterSunrise } = getSunTimes(
    dayjs(),
    position
  );

  const sunTableData = getSunTimeTable(dayjs(), position);

  return (
    <>
      <Modal
        opened={sunInfoOpened}
        title="Solinformation"
        size="content"
        onClose={closeSunInfo}
      >
        <Group justify="center" gap="xl">
          <Table stickyHeader striped py={4} data={sunTableData} />
        </Group>
      </Modal>
      <UnstyledButton onClick={openSunInfo}>
        <Stack gap={8}>
          <SunIcon
            isSunset={afterSunrise}
            sunTime={afterSunrise ? sunsetTime : sunriseTime}
          />
          <Divider />
          <SunIcon
            isSunset={!afterSunrise}
            sunTime={!afterSunrise ? sunsetTime : sunriseTime}
          />
        </Stack>
      </UnstyledButton>
    </>
  );
}
