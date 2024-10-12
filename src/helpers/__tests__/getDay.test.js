import dayjs from 'dayjs';
import {
  DAYS,
  getDayText,
  isAlmostTomorrow,
  isToday,
  isTomorrow,
} from '../getDay.js';
import { vi } from 'vitest';

const today = dayjs();
const fakeTodayDate = new Date('2024-09-22T15:10');
const fakeTodayDateLate = new Date('2024-09-22T22:01');

describe('getDay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return today text as default', () => {
    expect(getDayText()).toBe(DAYS[0]);
  });

  it('should return "today" text for today input', () => {
    expect(getDayText(today)).toBe(DAYS[0]);
    expect(isToday(today)).toBe(true);
    expect(isTomorrow(today)).toBe(false);
  });

  it('should return "tomorrow" text for tomorrow input', () => {
    const tomorrow = today.add(1, 'day');
    expect(getDayText(tomorrow)).toBe(DAYS[1]);
    expect(isToday(tomorrow)).toBe(false);
    expect(isTomorrow(tomorrow)).toBe(true);
  });

  it('should return Monday as tomorrow', () => {
    vi.setSystemTime(fakeTodayDate);
    const fakeToday = dayjs();
    const fakeTomorrow = fakeToday.add(1, 'day');
    expect(getDayText(fakeTomorrow, false)).toBe('Monday');
    console.log(dayjs().format('YYYY-MM-DD HH:mm dddd'));
  });

  it('should return false before break hour (22:00 default) and true after', () => {
    vi.setSystemTime(fakeTodayDate);
    expect(isAlmostTomorrow()).toBe(false);
    expect(isAlmostTomorrow(14)).toBe(true);
    vi.setSystemTime(fakeTodayDateLate);
    expect(isAlmostTomorrow()).toBe(true);
  });
});
