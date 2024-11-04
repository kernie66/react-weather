import {
  getExpireTime,
  useExpireTimeout,
} from '../useExpireTimeout.js';
import { vi } from 'vitest';
import { act, renderHook } from '../../../testing-utils/index.js';

describe('test useExpireTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns expired after 1 second', () => {
    vi.setSystemTime(new Date('2024-09-22T21:59:59'));
    let expired;

    renderHook(() => {
      expired = useExpireTimeout(getExpireTime({ expireHour: 22 }));
    });

    expect(expired).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(expired).toBe(true);
  });

  it('returns expired after almost 24 hours', () => {
    vi.setSystemTime(new Date('2024-09-22T22:00:01'));
    let expired;

    renderHook(() => {
      expired = useExpireTimeout(getExpireTime({ expireHour: 22 }));
    });

    expect(expired).toBe(false);
    act(() => {
      vi.advanceTimersByTime(24 * 60 * 60 * 1000);
    });
    expect(expired).toBe(true);
  });

  it('returns expired after 1 hour by setting minutes to the current time', () => {
    vi.setSystemTime(new Date('2024-09-22T22:00:00'));
    let expired;

    renderHook(() => {
      expired = useExpireTimeout(getExpireTime({ expireMinute: 0 }));
    });

    expect(expired).toBe(false);
    act(() => {
      vi.advanceTimersByTime(60 * 60 * 1000);
    });
    expect(expired).toBe(true);
  });

  it('returns expired after 15 seconds', () => {
    vi.setSystemTime(new Date('2024-09-22T22:00:00'));
    let expired;

    renderHook(() => {
      expired = useExpireTimeout(getExpireTime({ expireSecond: 15 }));
    });

    expect(expired).toBe(false);
    act(() => {
      vi.advanceTimersByTime(15 * 1000);
    });
    expect(expired).toBe(true);
  });
});
