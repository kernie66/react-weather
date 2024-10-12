import { describe, vi, expect } from 'vitest';
import { render, screen } from '../../../testing-utils/index.js';
import { userEvent } from '../../../testing-utils/index.js';
import OpenMapButton from '../OpenMapButton.jsx';

const openMap = vi.fn(() => console.log('Open map button clicked'));

describe('OpenMapButton', () => {
  it('renders open map button and calls the open modal', async () => {
    const user = userEvent.setup();

    render(<OpenMapButton openMap={openMap} />);

    const openMapButton = screen.getByRole('button', {
      name: /öppna karta/i,
    });
    expect(openMapButton).toBeInTheDocument();

    await user.click(
      screen.getByRole('button', { name: /öppna karta/i })
    );

    expect(
      await screen.findByRole('button', { text: /uppdatera/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('button', { text: /helskärm/i })
    ).toBeInTheDocument();
    expect(openMap).toHaveBeenCalledOnce();
  });
});
