import { http, HttpResponse } from 'msw';
import weatherDataJson from '../../bruno/weather_alert_response.json';

const baseURL = import.meta.env.VITE_BASE_URL;

export const weatherHandlers = [
  http.get(`${baseURL}/onecall`, () => {
    // console.log('weatherDataJson', weatherDataJson);
    return HttpResponse.json(weatherDataJson);
  }),
];
