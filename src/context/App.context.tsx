import UserApi from '@/apis/user';
import { createContext, useEffect, useState } from 'react';

interface IAppContext {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

export const AppContext = createContext<IAppContext>({
  user: null,
  setUser: () => {},
});

export const AppProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const run = async () => {
      const { isError, status, data } = await UserApi.me();
      if (!isError) {
        const { user_info: user } = data;
        setUser(user);
      }
      const { error } = data;
      if (status === 401) {
        console.error(error.message);
      }
    };
    run();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
