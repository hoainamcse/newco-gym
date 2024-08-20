'use client';

import AuthApi from '@/apis/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      if (searchParams) {
        const params: any = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
        // const res = await AuthApi.oauth2callback(params);

        // window.opener.postMessage(JSON.stringify(res), process.env.NEXT_PUBLIC_BASE_URL);
        // window.close();
        const { status, data } = await AuthApi.oauth2callback(params);
        if (status === 'success') {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          router.push('/connectors');
        }
      }
    };
    run();
  }, [router, searchParams]);

  return <div>Authenticating...</div>;
}
