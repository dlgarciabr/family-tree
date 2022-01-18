import React, { createContext, useState } from 'react';

import { Props, AuthContextType, AuthCredentials } from '../../types';
import { useLoginMutation } from '../../services/familyTreeApi';

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);
AuthenticationContext.displayName = "AuthenticationContext";

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [fetchToken, { data: resultData }] = useLoginMutation();

  const setContextUser = (user: any) => {
    setUser(user);
  }

  const signin = async (credentials: AuthCredentials, callback: VoidFunction) => {
    try {
      const payload = await fetchToken({ userLoginData: credentials }).unwrap();
      sessionStorage.setItem(
        'credentials',
        JSON.stringify({ ...payload })
      );
      setUser(payload);
      if (callback) {
        callback();
      }
    } catch (error) {
      //handled by error middleware
    }
  };

  const signout = (callback: VoidFunction) => {
    // return fakeAuthProvider.signout(() => {
    setUser(null);
    //     callback();
    // });
  };

  return (
    <AuthenticationContext.Provider value={{ user, setUser: setContextUser, signin, signout }}>
      {children}
    </AuthenticationContext.Provider >
  );
};

export default AuthenticationProvider;