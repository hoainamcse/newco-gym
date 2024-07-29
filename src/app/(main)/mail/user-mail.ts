import { atom, useAtom } from 'jotai';

import { mails } from '@/app/(main)/mail/data';
import { Email } from '@/types';

type Config = {
  selected: Email['id'] | null;
};

const configAtom = atom<Config>({
  selected: mails[0].id,
});

export function useMail() {
  return useAtom(configAtom);
}
