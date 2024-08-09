'use client';

import { SWRConfig } from 'swr';

const SWRProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <SWRConfig
      value={{ revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false }}
    >
      {children}
    </SWRConfig>
  );
};

export default SWRProvider;
