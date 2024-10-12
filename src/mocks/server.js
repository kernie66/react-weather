import { setupServer } from 'msw/node';
import { weatherHandlers } from './weatherHandlers.js';
import { defaultHandlers } from './defaultHandlers.js';
import { translationHandlers } from './translationHandlers.js';

export const server = setupServer(
  ...weatherHandlers,
  ...translationHandlers,
  ...defaultHandlers
);
