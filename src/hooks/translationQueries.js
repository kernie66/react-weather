import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { isEmpty } from 'radash';
import queryPersister from '../helpers/queryPersister.js';
import { useCallback } from 'react';

const googleApiKey = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
const googleApiUrl =
  'https://translation.googleapis.com/language/translate/v2';
const fullApiUrl = `${googleApiUrl}?key=${googleApiKey}`;

const getTranslation = async ({
  queryKey: [, { texts, language }], // Get the objects of queryKey[1]
}) => {
  if (isEmpty(texts)) {
    console.log('Error: No text supplied to translate');
    throw new Error('No text supplied to translate');
  }

  const { data } = await axios.post(fullApiUrl, {
    q: texts,
    target: language,
  });
  return data.data.translations; // return array of translations
};

export const useTranslation = (defaultLanguage = 'sv') => {
  const queryClient = useQueryClient();

  const translate = useCallback(
    async (text, language = defaultLanguage) => {
      console.log('Hook text to translate:', text);
      const translatedTexts = await queryClient.fetchQuery({
        queryKey: [
          'translations',
          { texts: text, language: language },
        ],
        queryFn: getTranslation,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60 * 24 * 7, // One week
        persister: queryPersister(),
      });
      // setTextToTranslate(text);
      // setTargetLanguage(language);
      console.log('Hook translatedTexts:', translatedTexts);
      return translatedTexts;
    },
    [defaultLanguage, queryClient]
  );

  return translate;
};
