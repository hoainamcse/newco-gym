'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link2, SquareMousePointer } from 'lucide-react';

import AuthApi from '@/apis/auth';

export function FacebookConnection() {
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
      <div className="h-[390px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 p-6 rounded-md">
        <p className="font-medium mb-auto">Facebook Authorization</p>
        <Image
          width="80"
          height="80"
          src="https://img.icons8.com/color/480/facebook-new.png"
          alt="facebook-new"
        />
        {!fbUser ? (
          <Button className="bg-[#039be5] hover:bg-[#039be5] w-full" onClick={handleAuthorize}>
            Connect with Facebook
          </Button>
        ) : (
          <Button variant="destructive" className="w-full" onClick={handleDisconnect}>
            <Link2 className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        )}
        <p className="text-sm font-medium mt-auto">Authorize Facebook for Content Upload</p>
      </div>
    </div>
  );
}
