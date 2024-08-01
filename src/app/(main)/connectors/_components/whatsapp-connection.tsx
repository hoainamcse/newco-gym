'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link2, SquareMousePointer } from 'lucide-react';

import { Input } from '@/components/ui/input';

import AuthApi from '@/apis/auth';
import { ReloadIcon } from '@radix-ui/react-icons';
import { PhoneInput } from '@/components/ui/phone-input';

export function WhatsappConnection() {
  const [waUser, setWaUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState();

  const handleAuthorize = async () => {
    setIsLoading(true);
    try {
      const {
        data: { user },
      } = await AuthApi.connectWhatsapp({ phone_number: value });
      localStorage.setItem('waUser', JSON.stringify(user));
      setWaUser(user);
      toast(<span className="font-semibold text-teal-600">Update successful</span>);
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

  const handleChooseOther = () => {
    toast(<span className="font-semibold text-yellow-600">Not working</span>);
  };

  useEffect(() => {
    const item = localStorage.getItem('waUser');
    if (item) {
      setValue(JSON.parse(item).phone_number);
      setWaUser(JSON.parse(item));
    }
  }, []);

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
              // onChange={(event) => setValue(event.target.value)}
              onChange={(event) => console.log(event)}
              disabled={!!waUser}
            />
            <Button className="bg-[#40c351] hover:bg-[#40c351] w-full" onClick={handleAuthorize}>
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              Connect with WhatsApp
            </Button>
          </>
        ) : (
          <Button variant="destructive" className="w-full" onClick={handleDisconnect}>
            <Link2 className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        )}
        <p className="text-sm font-medium mt-auto">
          Authorize for WhatsApp Content Generation Chatbot
        </p>
      </div>
      {waUser && (
        <div className="flex gap-2 mt-4">
          <Button className="rounded-none" variant="outline" onClick={handleDisconnect}>
            <Link2 className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
          <Button className="rounded-none" onClick={handleChooseOther}>
            <SquareMousePointer className="h-4 w-4 mr-2" />
            Choose the another account
          </Button>
        </div>
      )}
    </div>
  );
}
