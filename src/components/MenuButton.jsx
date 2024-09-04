import { TbRefresh } from 'react-icons/tb';
import { TbMenu2 } from 'react-icons/tb';
import { FaCompress } from 'react-icons/fa';
import { Button, Menu, rem, Text } from '@mantine/core';
import { useFullscreen } from '@mantine/hooks';

export default function MenuButton() {
  const { toggle, fullscreen } = useFullscreen();

  const reload = () => {
    window.location.reload();
  };

  return (
    <Menu position="bottom-start">
      <Menu.Target>
        <Button
          px={0}
          variant="subtle"
          fz={36}
          c="teal"
          className="MenuButton"
        >
          <TbMenu2 />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={reload}
          leftSection={
            <TbRefresh
              color="teal"
              style={{ width: rem(20), height: rem(20) }}
            />
          }
        >
          <Text fz={20}>Uppdatera</Text>
        </Menu.Item>
        <Menu.Item
          onClick={toggle}
          leftSection={
            fullscreen ? (
              <FaCompress
                color="teal"
                style={{ width: rem(20), height: rem(20) }}
              />
            ) : (
              <FaCompress
                color="teal"
                style={{ width: rem(20), height: rem(20) }}
              />
            )
          }
        >
          <Text fz={20}>{fullscreen ? 'Återställ' : 'Helskärm'}</Text>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
