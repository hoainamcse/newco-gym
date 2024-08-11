'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { AppContext } from '@/context/App.context';
import GmailApi from '@/apis/gmail';
import { useSWRConfig } from 'swr';
import { ReloadIcon } from '@radix-ui/react-icons';

function ConfigWatching() {
  const { user, isLoading } = useContext(AppContext);

  const { mutate: globalMutate } = useSWRConfig();

  const [isValidating, setIsValidating] = useState(false);

  const handleWatching = async () => {
    setIsValidating(true);
    try {
      if (user.last_history_id) {
        await GmailApi.stopWatching();
        globalMutate('USER');
        toast(<span className="font-semibold text-teal-600">Stop watching successful</span>);
      } else {
        await GmailApi.startWatching();
        globalMutate('USER');
        toast(<span className="font-semibold text-teal-600">Start watching successful</span>);
      }
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Card className="w-full mx-auto p-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Adjust Mail Receiving Ability</CardTitle>
            <CardDescription className="mt-1.5">
              Use the switcher to start or stop receive email.
            </CardDescription>
          </div>
          {isLoading || isValidating ? (
            <ReloadIcon className="h-4 w-4 animate-spin" />
          ) : (
            <Switch checked={user?.last_history_id} onClick={handleWatching} />
          )}
        </div>
      </CardHeader>
    </Card>
  );
}

export default ConfigWatching;
