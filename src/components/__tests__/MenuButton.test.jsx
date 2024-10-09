import { describe } from 'vitest';
import MenuButton from '../MenuButton.jsx';
import { render, screen } from '../../../testing-utils';
import { userEvent } from '../../../testing-utils/index.js';

describe('MenuButton', () => {
  it('renders menu button and opens the menu', async () => {
    render(<MenuButton />);

    const menuButton = screen.getByRole('button', {
      name: /meny/i,
    });
    expect(menuButton).toBeInTheDocument();

    await userEvent.click(
      menuButton
      // screen.getByRole('button', { name: /meny/i })
    );

    expect(await screen.findByText(/uppdatera/i)).toBeInTheDocument();
    expect(await screen.findByText(/helskärm/i)).toBeInTheDocument();
  });
});
