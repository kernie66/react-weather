import { setupWorker } from 'msw/browser';
import { weatherHandlers } from './weatherHandlers.js';

export const worker = setupWorker(...weatherHandlers);
