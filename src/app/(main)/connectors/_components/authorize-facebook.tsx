'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link2, SquareMousePointer } from 'lucide-react';

import AuthApi from '@/apis/auth';

export function AuthorizeFacebook() {
  const [fbUser, setFbUser] = useState(null);

  const handleAuthorize = async () => {
    const { url } = await AuthApi.connectFacebook();
    const windowFeatures = 'width=600,height=600,menubar=no,toolbar=no,location=no,status=no';
    window.open(url, '_blank', windowFeatures);
  };

  const handleDisconnect = () => {
    localStorage.removeItem('fbUser');
    window.location.reload();
  };

  const handleChooseOther = () => {
    toast(<span className="font-semibold text-yellow-600">Not working</span>);
  };

  useEffect(() => {
    const handleAuthMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) {
        return;
      }

      const {
        status,
        data: { user },
      } = JSON.parse(e.data);

      if (status === 'success') {
        localStorage.setItem('fbUser', JSON.stringify(user));
        setFbUser(user);
        toast(<span className="font-semibold text-teal-600">Update successful</span>);
      }
    };

    window.addEventListener('message', handleAuthMessage);

    return () => {
      window.removeEventListener('message', handleAuthMessage);
    };
  }, []);

  useEffect(() => {
    const item = localStorage.getItem('fbUser');
    if (item) {
      setFbUser(JSON.parse(item));
    }
  }, []);

  return (
    <div className="w-fit min-w-[390px] place-self-center">
      <div className="h-[360px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 px-6">
        <Image
          width="80"
          height="80"
          src="https://img.icons8.com/?size=100&id=118467&format=png&color=000000"
          alt="facebook-new"
        />
        <Button className="rounded-none" onClick={handleAuthorize} disabled={!!fbUser}>
          {!!fbUser ? 'Authorized' : 'Authorize'}
        </Button>
      </div>
      {fbUser && (
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
