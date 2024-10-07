import { describe } from 'vitest';
import MenuButton from '../MenuButton.jsx';
import { render, screen } from '../../../testing-utils';
import { userEvent } from '../../../testing-utils/index.js';

describe('MenuButton', () => {
  it('renders menu button and opens the menu', async () => {
    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /menubutton/i,
    });
    expect(menuButton).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', { name: /menubutton/i })
    );

    expect(
      await screen.findByRole('button', { text: /uppdatera/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { text: /helskärm/i })
    ).toBeInTheDocument();
  });
});
