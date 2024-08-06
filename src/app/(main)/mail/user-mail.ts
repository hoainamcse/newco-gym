import { atom, useAtom } from 'jotai';

import { Email } from '@/types';

type Config = {
  selected: Email['id'] | null;
};

const configAtom = atom<Config>({
  selected: null,
});

export function useMail() {
  return useAtom(configAtom);
}
