'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Bot, Clipboard, Link2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

import AuthApi from '@/apis/auth';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PhoneInput } from '@/components/ui/phone-input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { AppContext } from '@/context/App.context';
import { useSWRConfig } from 'swr';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  phone_number: z.string().min(8, {
    message: 'Phone number must be at least 8 characters.',
  }),
});

export function WhatsappConnection() {
  const { user } = useContext(AppContext);

  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState('');

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: '',
    },
  });

  const handleAuthorize = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await AuthApi.connectWhatsapp({ phone_number: values.phone_number });
      mutate('USER');
      toast(<span className="font-semibold text-teal-600">Connect WhatsApp successful</span>);
      setIsPopoverOpen(true);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await AuthApi.disconnectWhatsapp();
      mutate('USER');
      toast(<span className="font-semibold text-teal-600">Disconnect WhatsApp successful</span>);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText('+84 33 347 9771');
    alert('Phone number copied to clipboard!');
  };

  useEffect(() => {
    form.setValue('phone_number', user?.phone_number[0] || '');
  }, [user]);

  return (
    <div className="w-fit min-w-[360px] place-self-center">
      <div className="h-[360px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 p-6 rounded-md">
        <p className="font-medium mb-auto">WhatsApp Authorization</p>
        <Image
          width="80"
          height="80"
          src="https://img.icons8.com/color/480/whatsapp--v1.png"
          alt="whatsapp--v1"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAuthorize)} className="space-y-8 w-full">
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PhoneInput
                      international
                      className="bg-white rounded-none w-full"
                      defaultCountry="VN"
                      disabled={user.phone_number.length}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!user.phone_number.length && (
              <Button className="bg-[#40c351] hover:bg-[#40c351] w-full" type="submit">
                {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                Connect with WhatsApp
              </Button>
            )}
          </form>
        </Form>
        {!!user.phone_number.length && (
          <div className="w-full flex gap-2">
            <Button variant="destructive" className="w-full" onClick={handleDisconnect}>
              {isLoading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Link2 className="h-4 w-4 mr-2" />
              )}
              Disconnect
            </Button>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bot className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">How to use chatbot?</h4>
                    <p className="text-sm text-muted-foreground">
                      Authorize this phone number to interact with your AI Bot on WhatsApp
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Input
                      defaultValue="+84 33 347 9771"
                      readOnly
                      className="col-span-2 h-8 text-center"
                    />
                  </div>
                  <Button onClick={copyToClipboard}>
                    <Clipboard className="w-4 h- mr-2" /> Copy
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}
        <p className="text-sm font-medium mt-auto">Authorize WhatsApp for Content Generation</p>
      </div>
    </div>
  );
}
