import { Group, Modal, Table } from '@mantine/core';
import { getSunTimeTable } from '../helpers/getSunTimeTable.js';
import dayjs from 'dayjs';
import { useWeatherPosition } from '../hooks/weatherQueries.js';

export default function SunInfoModal({
  sunInfoOpened,
  closeSunInfo,
}) {
  const { data: position } = useWeatherPosition();

  const sunTableData = getSunTimeTable(dayjs(), position);

  return (
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
  );
}
