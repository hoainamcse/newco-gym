'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Bot, Clipboard, Link2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

import AuthApi from '@/apis/auth';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PhoneInput } from '@/components/ui/phone-input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function WhatsappConnection() {
  const [waUser, setWaUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState('');

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleAuthorize = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await AuthApi.connectWhatsapp({ phone_number: value });
      localStorage.setItem('waUser', JSON.stringify(user));
      setWaUser(user);
      toast(<span className="font-semibold text-teal-600">Update successful</span>);
      setIsPopoverOpen(true);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">Error happen</span>);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem('waUser');
    window.location.reload();
  };

  useEffect(() => {
    const item = localStorage.getItem('waUser');
    if (item) {
      setValue(JSON.parse(item).phone_number);
      setWaUser(JSON.parse(item));
    }
  }, []);

  const copyToClipboard =async () => {
    await navigator.clipboard.writeText('+1 (555) 025-2681');
    alert("Phone number copied to clipboard!");
  };

  return (
    <div className="w-fit min-w-[390px] place-self-center">
      <div className="h-[390px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 p-6 rounded-md">
        <p className="font-medium mb-auto">WhatsApp Authorization</p>
        <Image
          width="80"
          height="80"
          src="https://img.icons8.com/color/480/whatsapp--v1.png"
          alt="whatsapp--v1"
        />
        {!waUser ? (
          <>
            <PhoneInput
              placeholder="Phone number"
              className="bg-white rounded-none w-full"
              value={value}
              onChange={(event) => setValue(event as string)}
              disabled={!!waUser}
            />
            <Button className="bg-[#40c351] hover:bg-[#40c351] w-full" onClick={handleAuthorize}>
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Connect with WhatsApp
            </Button>
          </>
        ) : (
          <div className="w-full flex gap-2">
            <Button variant="destructive" className="w-full" onClick={handleDisconnect}>
              <Link2 className="h-4 w-4 mr-2" />
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
                      Contact this phone number to interact with Chatbot
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Input
                      defaultValue="+1 (555) 025-2681"
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
        <p className="text-sm font-medium mt-auto">
          Authorize for WhatsApp Content Generation Chatbot
        </p>
      </div>
    </div>
  );
}
