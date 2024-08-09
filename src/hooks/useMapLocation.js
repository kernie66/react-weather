import { useContext } from 'react';
import { MapLocationContext } from '../contexts/Contexts.js';

export default function useMapLocation() {
  return useContext(MapLocationContext);
}
