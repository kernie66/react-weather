import { render, screen } from '../../../testing-utils';
import CurrentWeather from '../CurrentWeather.jsx';
import { expect } from 'vitest';

describe('CurrentWeather', () => {
  it('should render the current weather icon and text', async () => {
    render(<CurrentWeather />);

    expect(
      screen.getByText(/väntar på väderdata/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByRole('button', { name: /väderöversikt/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/växlande molnighet/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/uppehåll/i)).toBeInTheDocument();
    screen.debug();
  });
});
