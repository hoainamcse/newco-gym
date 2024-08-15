'use client';

import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import AuthApi from '@/apis/auth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async () => {
    const {
      data: { url },
    } = await AuthApi.signIn();
    const windowFeatures = 'width=600,height=600,menubar=no,toolbar=no,location=no,status=no';
    window.open(url, '_blank', windowFeatures);
  };

  useEffect(() => {
    const handleAuthMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) {
        // Ignore messages from other origins
        return;
      }

      const {
        status,
        data: { user, access_token, refresh_token },
      } = JSON.parse(e.data);

      if (status === 'success') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        window.location.href = '/connectors';
      }
    };

    window.addEventListener('message', handleAuthMessage);

    return () => {
      window.removeEventListener('message', handleAuthMessage);
    };
  }, [router]);

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col bg-white text-black items-center justify-center p-10">
        <Link href="/" className="flex justify-center mb-6">
          <Image src="/foxmail-icon.png" width={40} height={40} alt="Logo" className="h-10" />
        </Link>
        <h1 className="text-2xl font-semibold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-500 mb-6">
          Sign up today and unlock a world of possibilities. Your adventure begins here.
        </p>
        <Button variant="outline" className="w-full" onClick={handleSignIn}>
          <FaGoogle className="text-xl mr-2" /> Continue with Google
        </Button>
      </div>
      <div className="basis-1/2 bg-gray-900 hidden sm:flex flex-col justify-center items-center p-10">
        <div className="max-w-md text-white text-center">
          <p className="mb-4">
            Beyond UI: It&apos;s the design equivalent of discovering the theory of relativity for
            your creativity!
          </p>
          <p className="font-semibold">- Albert Einstein</p>
        </div>
      </div>
    </div>
  );
}
