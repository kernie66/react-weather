import { useContext } from 'react';
import { LocationContext } from '../contexts/Contexts.js';

const defaultLat = import.meta.env.VITE_DEFAULT_LATITUDE;
const defaultLon = import.meta.env.VITE_DEFAULT_LONGITUDE;
export const defaultPosition = {
  lat: parseFloat(defaultLat),
  lng: parseFloat(defaultLon),
};
export const defaultAddress = 'Rotebro, Sollentuna, Sverige';

export default function useLocation() {
  return useContext(LocationContext);
}
