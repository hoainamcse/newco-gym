'use client';

import AuthApi from '@/apis/auth';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function CallbackFacebook() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      if (searchParams) {
        const params: any = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
        // const res = await AuthApi.facebookCallback(params);

        // window.opener.postMessage(JSON.stringify(res), process.env.NEXT_PUBLIC_BASE_URL);
        // window.close();
        const { status, data } = await AuthApi.facebookCallback(params);
        if (status === 'success') {
          localStorage.setItem('fbUser', JSON.stringify(data.user));
          window.location.href = '/connectors';
        }
      }
    };
    run();
  }, [searchParams]);

  return <div>Authenticating...</div>;
}
