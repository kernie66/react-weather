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
      return data;
    }
    return false;
  }, [textToTranslate, targetLanguage]);

  const translationQuery = useQuery({
    queryKey: ['translation', textToTranslate, targetLanguage],
    queryFn: getTranslation,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 15, // 15 minutes
  });

  const translate = (text) => {
    console.log('text', text);
    setTextToTranslate(text);
  };

  return [translate, translationQuery];
};
