'use client';

import UserApi from '@/apis/user';
import { createContext, useEffect, useState } from 'react';
import useSWR from 'swr';

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
  const {
    data: user,
    isLoading: loading,
    mutate,
    isValidating,
  } = useSWR('USER', () => UserApi.me().then((res) => res.data));

  return (
    <AppContext.Provider value={{ user, setUser: mutate, isLoading: loading || isValidating }}>
      {children}
    </AppContext.Provider>
  );
};
