import { http, HttpResponse } from 'msw';

export const defaultHandlers = [
  http.get('*', () => {
    return HttpResponse.json({});
  }),
  http.post('*', () => {
    return HttpResponse.json({});
  }),
  http.put('*', () => {
    return HttpResponse.json({});
  }),
  http.patch('*', () => {
    return HttpResponse.json({});
  }),
  http.delete('*', () => {
    return HttpResponse.json({});
  }),
];
