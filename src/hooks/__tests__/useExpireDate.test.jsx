import useExpireDate from '../useExpireDate.js';
import { vi } from 'vitest';
import { act, renderHook } from '../../../testing-utils';

describe('test useExpireDate', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns expired after 1 second', async () => {
    vi.setSystemTime(new Date('2024-09-22T21:59:59'));
    let expired;

    renderHook(() => {
      expired = useExpireDate({ expireHour: 22 });
    });

    expect(expired).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(expired).toBe(true);
  });

  it('returns expired after almost 24 hours', async () => {
    vi.setSystemTime(new Date('2024-09-22T22:00:01'));
    let expired;

    renderHook(() => {
      expired = useExpireDate({ expireHour: 22 });
    });

    expect(expired).toBe(false);
    act(() => {
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    });
    expect(expired).toBe(true);
  });

  it('returns expired after 15 seconds', async () => {
    vi.setSystemTime(new Date('2024-09-22T22:00:00'));
    let expired;

    renderHook(() => {
      expired = useExpireDate({ expireSecond: 15 });
    });

    expect(expired).toBe(false);
    act(() => {
      vi.advanceTimersByTime(15 * 1000);
    });
    expect(expired).toBe(true);
  });
});
