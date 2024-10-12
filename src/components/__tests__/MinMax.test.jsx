import { describe } from 'vitest';
import { render, screen } from '../../../testing-utils';
import MinMax from '../MinMax.jsx';

describe('MinMax', () => {
  it('should render the min and max temperatures', async () => {
    render(<MinMax />);

    expect(screen.getByRole('separator')).toBeInTheDocument();

    expect(await screen.findByText('20')).toBeInTheDocument();
    expect(await screen.findByText('12')).toBeInTheDocument();
    expect(await screen.findByText(/\.9°C/)).toBeInTheDocument();
    expect(await screen.findByText(/\.0°C/)).toBeInTheDocument();
    screen.debug();
  });
});
