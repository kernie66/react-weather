import { describe, vi, expect } from 'vitest';
import MenuButton from '../MenuButton.jsx';
import { render, screen } from '../../../testing-utils';
import { userEvent } from '../../../testing-utils/index.js';
import { useFullscreen } from '@mantine/hooks';
import * as mantineHooks from '@mantine/hooks';

describe('test MenuButton', () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    });
  });

  it('renders menu button and opens the menu', async () => {
    const user = userEvent.setup();

    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();

    // Open the menu
    await user.click(menuButton);

    // Check that the menu items are rendered
    expect(
      await screen.findByRole('menuitem', {
        name: /uppdatera/i,
      })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('menuitem', {
        name: /helskärm/i,
      })
    ).toBeInTheDocument();
  });

  it('selects update from the menu', async () => {
    const user = userEvent.setup();

    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();
    expect(vi.isMockFunction(window.location.reload)).toBe(true);

    // Open the menu
    await user.click(menuButton);

    // Get the menu item update
    const menuItemUpdate = await screen.findByRole('menuitem', {
      name: /uppdatera/i,
    });
    expect(menuItemUpdate).toBeInTheDocument();

    // Check that reload is called
    await user.click(menuItemUpdate);
    expect(menuItemUpdate).toBeInTheDocument();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('selects fullscreen from the menu, then restores normal screen', async () => {
    const user = userEvent.setup();
    let toggleValue = true;

    const toggleSpy = vi.fn(() => {
      toggleValue = !toggleValue;
      console.log('toggleValue', toggleValue);
    });

    vi.mock('@mantine/hooks', { spy: true });
    const useFullscreenSpy = vi
      .spyOn(mantineHooks, 'useFullscreen')
      .mockReturnValue({
        toggle: toggleSpy,
        fullscreen: () => {
          return true;
        },
      });
    console.log('useFullscreenSpy', useFullscreenSpy);
    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();
    expect(useFullscreenSpy).toHaveReturned();
    expect(useFullscreen).toHaveReturnedWith(
      expect.objectContaining({
        fullscreen: false,
      })
    );
    expect(useFullscreenSpy).toHaveBeenCalled();

    // Open the menu
    await user.click(menuButton);

    // Get the fullscreen menu item
    const menuItemFullScreen = await screen.findByRole('menuitem', {
      name: /helskärm/i,
    });
    expect(menuItemFullScreen).toBeInTheDocument();
    expect(toggleSpy).not.toHaveBeenCalled();
    console.log('toggleSpy', toggleSpy);

    // Click on fullscreen
    await user.click(menuItemFullScreen);
    expect(useFullscreen).toHaveReturned();
    expect(useFullscreen).toHaveReturnedWith(
      expect.objectContaining({
        fullscreen: false,
      })
    );
    expect(useFullscreen).toHaveBeenCalled();
    expect(menuButton).toBeInTheDocument();
    expect(toggleSpy).toHaveBeenCalledTimes(1);
    console.log('toggleSpy', toggleSpy);

    // Open the menu again
    await user.click(menuButton);

    // Check that the menu item has changed to restore
    expect(
      await screen.findByRole('menuitem', { name: /återställ/i })
    ).toBeInTheDocument();
    screen.debug();
  });
});
