import { describe } from 'vitest';
import MenuButton from '../MenuButton.jsx';
import { render, screen } from '../../../testing-utils';
import { userEvent } from '../../../testing-utils/index.js';

describe('MenuButton', () => {
  it('renders menu button', () => {
    render(<MenuButton />);

    screen.debug();
    const menuButton = screen.getByRole('button', {
      name: /menubutton/i,
    });
    expect(menuButton).toBeInTheDocument();
  });

  it('opens menu when menu button clicked', async () => {
    const user = userEvent.setup();
    render(<MenuButton />);

    await user.click(
      screen.getByRole('button', { name: /menubutton/i })
    );

    screen.debug();
  });
});
