import { afterAll, beforeAll } from 'vitest';
import { server } from '../src/mocks/server.js';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
