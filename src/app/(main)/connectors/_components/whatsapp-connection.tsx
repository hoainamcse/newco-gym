'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link2, SquareMousePointer } from 'lucide-react';

import { Input } from '@/components/ui/input';

import AuthApi from '@/apis/auth';
import { ReloadIcon } from '@radix-ui/react-icons';

export function WhatsappConnection() {
  const [waUser, setWaUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [value, setValue] = useState('');

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
      setWaUser(JSON.parse(item));
    }
  }, []);

  return (
    <div className="w-fit min-w-[390px] place-self-center">
      <div className="h-[360px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 px-6">
        <Image
          width="80"
          height="80"
          src="https://img.icons8.com/?size=100&id=16733&format=png&color=000000"
          alt="whatsapp--v1"
        />
        <div className="flex items-stretch gap-2">
          <Input
            placeholder="Phone number"
            className="bg-white rounded-none"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={!!waUser}
          />
          <Button className="rounded-none" onClick={handleAuthorize} disabled={!!waUser}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {!!waUser ? 'Authorized' : 'Authorize'}
          </Button>
        </div>
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
