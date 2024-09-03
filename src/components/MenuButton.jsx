import { TbRefresh } from 'react-icons/tb';
import { TbMenu2 } from 'react-icons/tb';
import { FaCompress, FaExpand } from 'react-icons/fa';
import { Button, Menu, rem } from '@mantine/core';
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
            <TbRefresh style={{ width: rem(14), height: rem(14) }} />
          }
        >
          Uppdatera
        </Menu.Item>
        <Menu.Item
          onClick={toggle}
          leftSection={
            fullscreen ? (
              <FaCompress
                style={{ width: rem(14), height: rem(14) }}
              />
            ) : (
              <FaExpand style={{ width: rem(14), height: rem(14) }} />
            )
          }
        >
          {fullscreen ? 'Återställ' : 'Helskärm'}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
