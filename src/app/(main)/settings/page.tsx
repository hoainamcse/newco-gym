'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { useContext, useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Setting } from '@/types';
import SettingsApi from '@/apis/settings';
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
import { AppContext } from '@/context/App.context';
import GmailApi from '@/apis/gmail';

function Settings() {
  const { user } = useContext(AppContext);

  const [checked, setChecked] = useState(!!user.last_history_id);

  const [value, setValue] = useState<number>(0);

  const [setting, setSetting] = useState<Setting | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { data } = await SettingsApi.create({
        ...setting,
        confidence_threshold: value,
      });
      setSetting(data.setting);
      toast(<span className="font-semibold text-teal-600">Confidence level updated</span>);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setLoading(false);
    }
  };

  const handleStartMail = async () => {
    setChecked(!checked);
    try {
      if (checked) {
        await GmailApi.stopWatching();
        toast(<span className="font-semibold text-teal-600">Stop successful</span>);
      } else {
        await GmailApi.startWatching();
        toast(<span className="font-semibold text-teal-600">Start successful</span>);
      }
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
      setChecked(!checked);
    }
  };

  useEffect(() => {
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        const { data } = await SettingsApi.list();
        if (data.setting.length > 0) {
          setSetting(data.setting[0]);
          setValue(data.setting[0].confidence_threshold);
        }
      } catch (err: any) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadSettings();
  }, []);

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
          <Card className="w-full mx-auto p-4">
            <CardHeader>
              <CardTitle>Adjust the Confidence Level</CardTitle>
              <CardDescription>
                Use the slider to select a value within the specified range.
              </CardDescription>
            </CardHeader>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
              </div>
            ) : (
              <CardContent>
                <form className="space-y-4" onSubmit={onSubmit}>
                  <div className="grid gap-4">
                    <Label htmlFor="value">Value: {value}</Label>
                    <Slider
                      id="value"
                      name="value"
                      max={1}
                      step={0.05}
                      className="mt-2"
                      value={[value]}
                      onValueChange={(values) => setValue(values[0])}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>0</span>
                    <span>1</span>
                  </div>
                  <Button type="submit" className="w-full">
                    {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                    Submit
                  </Button>
                </form>
              </CardContent>
            )}
          </Card>
          <Card className="w-full mx-auto p-4">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Adjust Mail Receiving Ability</CardTitle>
                  <CardDescription className="mt-1.5">
                    Use the switcher to start or stop receive email.
                  </CardDescription>
                </div>
                <Switch checked={checked} onClick={handleStartMail} />
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Settings;
