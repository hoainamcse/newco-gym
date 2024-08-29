'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { Link2 } from 'lucide-react';

import AuthApi from '@/apis/auth';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/App.context';
import { useSWRConfig } from 'swr';

export function FacebookConnection() {
  const { user } = useContext(AppContext);

  const { mutate } = useSWRConfig();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleAuthorize = async () => {
    try {
      const { url } = await AuthApi.connectFacebook();
      // const windowFeatures = 'width=600,height=600,menubar=no,toolbar=no,location=no,status=no';
      // window.open(url, '_blank', windowFeatures);
      router.push(url);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    }
  };
  1;

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      await AuthApi.disconnectFacebook();
      mutate('USER');
      toast(<span className="font-semibold text-teal-600">Disconnect WhatsApp successful</span>);
    } catch (err: any) {
      toast(<span className="font-semibold text-red-600">{err.message}</span>);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const handleAuthMessage = (e: MessageEvent) => {
  //     if (e.origin !== window.location.origin) {
  //       return;
  //     }

  //     const {
  //       status,
  //       data: { user },
  //     } = JSON.parse(e.data);

  //     if (status === 'success') {
  //       toast(<span className="font-semibold text-teal-600">Update successful</span>);
  //     }
  //   };

  //   window.addEventListener('message', handleAuthMessage);

  //   return () => {
  //     window.removeEventListener('message', handleAuthMessage);
  //   };
  // }, []);

  return (
    <div className="w-fit min-w-[360px] place-self-center">
      <div className="h-[360px] border border-dashed bg-gray-50 border-gray-400 flex flex-col justify-center items-center gap-6 p-6 rounded-md">
        <p className="font-medium mb-auto">Facebook Authorization</p>
        <Image
          width="80"
          height="80"
          src="https://img.icons8.com/color/480/facebook-new.png"
          alt="facebook-new"
        />
        {!user.connected_facebook ? (
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
