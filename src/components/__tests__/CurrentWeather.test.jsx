import { render, screen, userEvent } from '../../../testing-utils';
import CurrentWeather from '../CurrentWeather.jsx';
import { expect } from 'vitest';

describe('CurrentWeather', () => {
  it('should render the current weather icon and text', async () => {
    const user = userEvent.setup();

    render(<CurrentWeather />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    const weatherOverviewButton = await screen.findByRole('button', {
      name: /väderöversikt/i,
    });
    expect(weatherOverviewButton).toBeInTheDocument();
    expect(
      await screen.findByText(/växlande molnighet/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/uppehåll/i)).toBeInTheDocument();

    await user.click(weatherOverviewButton);
    expect(
      await screen.findByText(/väderöversikt för 2024-10-13/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/translated text 102/i)
    ).toBeInTheDocument();
    screen.debug();
  });
});
