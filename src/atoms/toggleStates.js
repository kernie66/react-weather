import { atom } from 'jotai';

export function atomWithToggle(initialValue) {
  const anAtom = atom(initialValue, (get, set, nextValue) => {
    let update = !get(anAtom);
    if ((nextValue === false) | (nextValue === true)) {
      update = nextValue;
    }
    set(anAtom, update);
  });
  return anAtom;
}

export const mapModalToggleState = atomWithToggle(false);

export const historyToggleState = atomWithToggle(false);

export const mapHistoryToggleState = atomWithToggle(false);

export const mapAddressToggleState = atomWithToggle(false);
