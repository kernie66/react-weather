import { render, screen } from '../../../testing-utils';
import UpdatedAt from '../UpdatedAt.jsx';

describe('UpdatedAt', () => {
  it('should display the time from current weather', () => {
    render(<UpdatedAt />);

    screen.debug();
  });
});
