import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useCallback, useState } from 'react';

const googleApiKey = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
const googleApiUrl =
  'https://translation.googleapis.com/language/translate/v2';
const fullApiUrl = `${googleApiUrl}?key=${googleApiKey}`;

export const useTranslation = (targetLanguage = 'sv') => {
  const [textToTranslate, setTextToTranslate] = useState();

  const getTranslation = useCallback(async () => {
    console.log('textToTranslate', textToTranslate);
    if (textToTranslate) {
      const { data } = await axios.post(fullApiUrl, {
        q: textToTranslate,
        target: targetLanguage,
      });
      console.log('data', data.data.translations);
      return data.data.translations; // return array of translations
    }
    return false;
  }, [textToTranslate, targetLanguage]);

  const translationQuery = useQuery({
    queryKey: ['translations', textToTranslate, targetLanguage],
    queryFn: getTranslation,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 7, // One week
  });

  const translate = (text) => {
    console.log('text', text);
    setTextToTranslate(text);
  };

  return [translate, translationQuery];
};
