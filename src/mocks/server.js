import { setupServer } from 'msw/node';
import { handlers } from './handlers.js';
import { defaultHandlers } from './defaultHandlers.js';

export const server = setupServer(...handlers, ...defaultHandlers);
