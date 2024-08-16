'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, RefreshCcw } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import SettingsApi from '@/apis/settings';
import { toast } from 'sonner';
import { ReloadIcon } from '@radix-ui/react-icons';
import { Setting } from '@/types';
import Image from 'next/image';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';

const pattern = /^https:\/\/drive\.google\.com\/drive\/folders\/[a-zA-Z0-9_-]+(\?.*)?$/;

const formSchema = z.object({
  google_drive_url: z.string().regex(pattern, { message: 'Invalid Google Drive folder URL' }),
});

export function ConnectDrive() {
  const {
    data: setting,
    isLoading,
    mutate,
  } = useSWR('SETTING', () => SettingsApi.list().then((res) => res.data.setting[0]));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      google_drive_url: '',
    },
  });

  const [isValidating, setIsValidating] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsValidating(true);
    try {
      const payload = { ...setting, google_drive_url: values.google_drive_url };
      await SettingsApi.create(payload);
      mutate(payload as Setting);
      toast(<span className="font-semibold text-teal-600">Update Google Drive link successful</span>);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsValidating(false);
    }
  };

  useEffect(() => {
    form.setValue('google_drive_url', setting?.google_drive_url || '');
  }, [setting]);

  if (isLoading) {
    return <Skeleton className='w-[360px] h-[360px] place-self-center' />
  }

  return (
    <div className="w-fit min-w-[360px] place-self-center">
      <div className="h-[360px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 p-6 rounded-md">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center items-center gap-6 "
          >
            <Image
              width="80"
              height="80"
              src="https://img.icons8.com/color/480/google-drive--v1.png"
              alt="google-drive--v1"
            />
            <FormField
              control={form.control}
              name="google_drive_url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Insert the Google Drive's URL"
                        className="bg-white pr-8"
                        {...field}
                      />
                      <Link className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {setting?.google_drive_url ? (
              <Button type="submit" className="bg-[#4CAF50] hover:bg-[#4CAF50] w-full">
                {isValidating ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCcw className="h-4 w-4 mr-2" />
                )}
                Refresh
              </Button>
            ) : (
              <Button type="submit" className="bg-[#4CAF50] hover:bg-[#4CAF50] w-full">
                {isValidating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Import knowledge
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
