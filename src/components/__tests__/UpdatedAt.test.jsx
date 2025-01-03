import { render, screen } from '../../../testing-utils';
import UpdatedAt from '../UpdatedAt.jsx';
import { vi } from 'vitest';
import { useNetwork } from '@mantine/hooks';

vi.mock('@mantine/hooks', async (importOriginal) => {
  const realHooks = await importOriginal();
  return {
    ...realHooks,
    useNetwork: vi.fn(),
  };
});

describe('test UpdatedAt', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('displays the time from fake weather when online', async () => {
    useNetwork.mockReturnValue({
      online: true,
    });

    render(<UpdatedAt />);

    expect(
      await screen.findByText(/fredag 12 juli 2024 kl. 11:20/i)
    ).toBeInTheDocument();
    expect(
      await screen.queryByText(/offline/i)
    ).not.toBeInTheDocument();
  });

  it('displays the time from fake weather when offline', async () => {
    useNetwork.mockReturnValue({
      online: false,
    });

    render(<UpdatedAt />);

    expect(
      await screen.findByText(/fredag 12 juli 2024 kl. 11:20/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/offline/i)).toBeInTheDocument();
  });
});
