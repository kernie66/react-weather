import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

const googleApiKey = import.meta.env.VITE_GOOGLEMAPS_API_KEY;
const googleApiUrl =
  'https://translation.googleapis.com/language/translate/v2';
const fullApiUrl = `${googleApiUrl}?key=${googleApiKey}`;

const getTranslation = async ({ queryKey }) => {
  const { data } = await axios.post(fullApiUrl, {
    q: queryKey[1].texts || 'No text provided',
    target: queryKey[1].language,
  });
  return data.data.translations; // return array of translations
};

export const useTranslation = (language = 'sv') => {
  const [textToTranslate, setTextToTranslate] = useState();

  const translationQuery = useQuery({
    queryKey: ['translations', { texts: textToTranslate, language }],
    queryFn: getTranslation,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60 * 24 * 7, // One week
  });

  const translate = (text) => {
    console.log('Text to translate:', text);
    setTextToTranslate(text);
  };

  return [translate, translationQuery];
};
