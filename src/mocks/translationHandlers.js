import { http, HttpResponse } from 'msw';

const getWordCount = (text) => {
  return text ? text.trim().split(/\s+/g).length : 0;
};

const getMockedTranslations = (text) => {
  switch (text) {
    case 'Downpour':
      return 'Regnskur';
    case 'Expect a day of partly cloudy with rain':
      return 'Räkna med en dag med delvis molnigt med regn';
    case 'There will be partly cloudy today':
      return 'Det kommer att vara halvmolnigt idag';
    default:
      return 'Translated text: ' + getWordCount(text) + ' words';
  }
};
export const translationHandlers = [
  http.post(
    'https://translation.googleapis.com/language/translate/v2',
    async ({ request }) => {
      const body = await request.json();
      const translatedText = getMockedTranslations(body?.q);
      return HttpResponse.json({
        data: {
          translations: [
            {
              translatedText: translatedText,
              detectedSourceLanguage: 'en',
            },
          ],
        },
      });
    }
  ),
];
