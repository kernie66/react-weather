import { vi } from 'vitest';
import { render, screen } from '../../../testing-utils/index.js';
import Body from '../Body.jsx';
import { useMediaQuery, useViewportSize } from '@mantine/hooks';

vi.mock('@mantine/hooks', async (importOriginal) => {
  const realHooks = await importOriginal();
  return {
    ...realHooks,
    useViewportSize: vi.fn(),
    useMediaQuery: vi.fn(),
  };
});

describe('test Body', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('renders the body while loading, screen width 1024', async () => {
    useViewportSize.mockReturnValue({
      width: 1024,
      height: 768,
    });
    useMediaQuery.mockReturnValue(false);

    render(<Body />);

    // Check that the page is loading
    expect(
      await screen.findByText(/laddar sidan/i)
    ).toBeInTheDocument();

    // Check that it suspends while children are loading
    expect(
      await screen.findByText(/vänta lite/i)
    ).toBeInTheDocument();

    // Check that the body page is rendered
    expect(
      await screen.findByRole('link', { name: /powered by pqina/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/uppdaterad/i)
    ).toBeInTheDocument();

    // Check that LeftSide is rendered
    expect(
      await screen.findByRole('button', { name: /soltider/i })
    ).toBeInTheDocument();

    // Check that RightSide is rendered
    expect(screen.getByText(/molntäcke/i)).toBeInTheDocument();
  });

  it('renders the body while loading, no RightSide, screen width 1023', async () => {
    useViewportSize.mockReturnValue({
      width: 1023,
      height: 768,
    });
    useMediaQuery.mockImplementation((query) => {
      console.log('query', query);
      if (query === '(max-width: 60rem)') {
        console.log('false', false);
        return false;
      } else {
        return true;
      }
    });
    // useMediaQuery.mockReturnValue(true);

    render(<Body />);

    // Check that the body page is rendered
    expect(
      await screen.findByRole('link', { name: /powered by pqina/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/uppdaterad/i)
    ).toBeInTheDocument();

    // Check that LeftSide is rendered
    expect(
      await screen.findByRole('button', { name: /soltider/i })
    ).toBeInTheDocument();

    // Check that RightSide is not rendered
    expect(
      await screen.queryByText(/molntäcke/i)
    ).not.toBeInTheDocument();
  });

  it('renders the body while loading, no LeftSide or RightSide, screen width 959', async () => {
    useViewportSize.mockReturnValue({
      width: 959,
      height: 768,
    });
    useMediaQuery.mockReturnValue(true);

    render(<Body />);

    // Check that the body page is rendered
    expect(
      await screen.findByText(/uppdaterad/i)
    ).toBeInTheDocument();

    // Check that LeftSide is not rendered
    expect(
      await screen.queryByRole('button', { name: /soltider/i })
    ).not.toBeInTheDocument();

    // Check that RightSide is not rendered
    expect(
      await screen.queryByText(/molntäcke/i)
    ).not.toBeInTheDocument();
  });
});
