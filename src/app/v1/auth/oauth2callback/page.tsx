"use client";

import Auth from "@/apis/auth";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthCallback() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const run = async () => {
      if (searchParams) {
        const params: any = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
        const res = await Auth.oauth2callback(params);

        window.opener.postMessage(JSON.stringify(res), process.env.NEXT_PUBLIC_BASE_URL);
        window.close();
      }
    };
    run();
  }, [searchParams]);

  return <div>Loading...</div>;
}
