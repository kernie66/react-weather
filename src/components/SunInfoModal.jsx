import { Group, Modal, Table, Title } from '@mantine/core';
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
      title={<Title order={3}>Solinformation</Title>}
      size="content"
      onClose={closeSunInfo}
      withCloseButton={false}
    >
      <Group justify="center" gap="xl">
        <Table
          stickyHeader
          striped
          stripedColor="blue.1"
          py={4}
          data={sunTableData}
          fz={16}
        />
      </Group>
    </Modal>
  );
}
