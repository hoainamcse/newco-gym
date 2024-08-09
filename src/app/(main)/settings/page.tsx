'use client';

import Link from 'next/link';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { AppContext } from '@/context/App.context';
import GmailApi from '@/apis/gmail';
import { useSWRConfig } from 'swr';
import ConfigConfidence from './_components/config-confidence';
import { ReloadIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

function Settings() {
  const { user } = useContext(AppContext);

  const { mutate: globalMutate } = useSWRConfig();

  const [loading, setLoading] = useState(false);

  const handleWatching = async () => {
    setLoading(true);
    try {
      if (user.last_history_id) {
        await GmailApi.stopWatching();
        toast(<span className="font-semibold text-teal-600">Stop watching successful</span>);
      } else {
        await GmailApi.startWatching();
        toast(<span className="font-semibold text-teal-600">Start watching successful</span>);
      }
      globalMutate('USER');
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Settings</h1>
      </div>
      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr] mt-8">
        <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
          <Link href="#" className="font-semibold text-primary">
            Configure Confidence Level
          </Link>
          {/* <Link href="#">Security</Link>
          <Link href="#">Integrations</Link>
          <Link href="#">Support</Link>
          <Link href="#">Organizations</Link>
          <Link href="#">Advanced</Link> */}
        </nav>
        <div className="grid gap-6">
          {/* <Card x-chunk="dashboard-04-chunk-1">
            <CardHeader>
              <CardTitle>Store Name</CardTitle>
              <CardDescription>
                Used to identify your store in the marketplace.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <Input placeholder="Store Name" />
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card>
          <Card x-chunk="dashboard-04-chunk-2">
            <CardHeader>
              <CardTitle>Plugins Directory</CardTitle>
              <CardDescription>
                The directory within your project, in which your plugins are
                located.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-4">
                <Input
                  placeholder="Project Name"
                  defaultValue="/content/plugins"
                />
                <div className="flex items-center space-x-2">
                  <Checkbox id="include" defaultChecked />
                  <label
                    htmlFor="include"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Allow administrators to change the directory.
                  </label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Save</Button>
            </CardFooter>
          </Card> */}
          <ConfigConfidence />
          <Card className="w-full mx-auto p-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Adjust Mail Receiving Ability</CardTitle>
                  <CardDescription className="mt-1.5">
                    Use the switcher to start or stop receive email.
                  </CardDescription>
                </div>
                {loading ? (
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                ) : (
                  <Switch
                    defaultChecked={user?.last_history_id}
                    checked={user?.last_history_id}
                    onClick={handleWatching}
                  />
                )}
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;
