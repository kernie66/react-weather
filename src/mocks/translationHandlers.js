import { http, HttpResponse } from 'msw';

export const translationHandlers = [
  http.post(
    'https://translation.googleapis.com/language/translate/v2',
    () => {
      return HttpResponse.json({
        data: {
          translations: [
            {
              translatedText: 'Translated text',
              detectedSourceLanguage: 'en',
            },
          ],
        },
      });
    }
  ),
];
