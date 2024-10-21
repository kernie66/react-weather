import { describe, vi, expect } from 'vitest';
import MenuButton from '../MenuButton.jsx';
import { render, screen } from '../../../testing-utils';
import { userEvent } from '../../../testing-utils/index.js';
import { useFullscreen } from '@mantine/hooks';

const toggleSpy = vi.fn();

vi.mock('@mantine/hooks');

describe('test MenuButton', () => {
  const original = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { reload: vi.fn() },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: original,
    });
    vi.restoreAllMocks();
  });

  it('renders menu button and opens the menu', async () => {
    const user = userEvent.setup();

    useFullscreen.mockReturnValue({
      toggle: toggleSpy,
      fullscreen: false,
    });

    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();
    expect(useFullscreen).toHaveBeenCalledOnce();

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
    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('selects update from the menu', async () => {
    const user = userEvent.setup();

    useFullscreen.mockReturnValue({
      toggle: toggleSpy,
      fullscreen: false,
    });

    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();
    expect(vi.isMockFunction(window.location.reload)).toBe(true);
    expect(useFullscreen).toHaveBeenCalledOnce();

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
    expect(toggleSpy).not.toHaveBeenCalled();
  });

  it('in normal screen, selects fullscreen from the menu', async () => {
    const user = userEvent.setup();

    useFullscreen.mockReturnValue({
      toggle: toggleSpy,
      fullscreen: false,
    });

    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();
    expect(useFullscreen).toHaveBeenCalledOnce();
    expect(useFullscreen).toHaveReturnedWith(
      expect.objectContaining({
        fullscreen: false,
      })
    );

    // Open the menu
    await user.click(menuButton);

    // Get the fullscreen menu item
    const menuItemFullScreen = await screen.findByRole('menuitem', {
      name: /helskärm/i,
    });
    expect(menuItemFullScreen).toBeInTheDocument();
    expect(toggleSpy).not.toHaveBeenCalled();

    // Click on fullscreen
    await user.click(menuItemFullScreen);
    expect(menuButton).toBeInTheDocument();
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });

  it('in fullscreen, selects normal screen from the menu', async () => {
    const user = userEvent.setup();

    useFullscreen.mockReturnValue({
      toggle: toggleSpy,
      fullscreen: true,
    });

    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();
    expect(useFullscreen).toHaveBeenCalledOnce();
    expect(useFullscreen).toHaveReturnedWith(
      expect.objectContaining({
        fullscreen: true,
      })
    );

    // Open the menu
    await user.click(menuButton);

    // Get the fullscreen menu item
    const menuItemRestore = await screen.findByRole('menuitem', {
      name: /återställ/i,
    });
    expect(menuItemRestore).toBeInTheDocument();
    expect(toggleSpy).not.toHaveBeenCalled();

    // Click on fullscreen
    await user.click(menuItemRestore);
    expect(menuButton).toBeInTheDocument();
    expect(toggleSpy).toHaveBeenCalledTimes(1);
  });
});
