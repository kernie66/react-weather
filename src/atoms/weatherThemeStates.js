import { atom } from 'jotai';
import {
  defaultBackgroundColor,
  defaultBackgroundImage,
  defaultInfoColor,
  defaultTempColor,
} from '../helpers/getWeatherTheme.js';

export const weatherThemeState = atom({
  backgroundImage: defaultBackgroundImage,
  backgroundColor: defaultBackgroundColor,
  infoColor: defaultInfoColor,
  tempColor: defaultTempColor,
});

export const backgroundImageState = atom(
  (get) => get(weatherThemeState).backgroundImage
);

export const backgroundColorState = atom(
  (get) => get(weatherThemeState).backgroundColor
);

export const infoColorState = atom(
  (get) => get(weatherThemeState).infoColor
);

export const tempColorState = atom(
  (get) => get(weatherThemeState).tempColor
);
