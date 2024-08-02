'use client';

import UserApi from '@/apis/user';
import { createContext, useEffect, useState } from 'react';

interface IAppContext {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean;
}

export const AppContext = createContext<IAppContext>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setIsLoading(true);
      try {
        const { data } = await UserApi.me();
        setUser(data);
      } catch (err: any) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};
