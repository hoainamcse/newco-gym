'use client';

import useSWR from 'swr';
import { toast } from 'sonner';

import SettingsApi from '@/apis/settings';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { Setting } from '@/types';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

export function AutoReply() {
  const {
    data: setting,
    isLoading,
    mutate,
  } = useSWR('SETTING', () => SettingsApi.list().then((res) => res.data.setting[0]));

  const [isValidating, setIsValidating] = useState(false);

  const handleChangeAutoReply = async () => {
    setIsValidating(true);
    try {
      const payload = { ...setting, auto_reply: !setting?.auto_reply };
      await SettingsApi.create(payload);
      mutate(payload as Setting);
      toast(
        <span className="font-semibold text-teal-600">
          Auto-reply is {!setting?.auto_reply ? 'enabled' : 'turned off'}
        </span>
      );
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="airplane-mode">Auto-Reply</Label>
      {isLoading || isValidating ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : (
        <Switch id="airplane-mode" checked={setting?.auto_reply} onClick={handleChangeAutoReply} />
      )}
    </div>
  );
}
