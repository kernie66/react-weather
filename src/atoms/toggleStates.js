import { atom } from 'jotai';

export function atomWithToggle(initialValue) {
  const anAtom = atom(initialValue, (get, set, nextValue) => {
    const update = nextValue ?? !get(anAtom);
    set(anAtom, update);
  });
  return anAtom;
}

export const mapModalToggleState = atomWithToggle(false);

export const historyPopoverToggleState = atomWithToggle(false);
