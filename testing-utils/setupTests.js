import { afterAll, beforeAll } from 'vitest';
import { server } from '../src/mocks/server.js';
import dayjs from 'dayjs';
import 'dayjs/locale/sv';
import localizedFormat from 'dayjs/plugin/localizedFormat.js';
import calendar from 'dayjs/plugin/calendar.js';

beforeAll(() => {
  server.listen();

  dayjs.locale('sv');
  dayjs.extend(localizedFormat);
  dayjs.extend(calendar);
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
