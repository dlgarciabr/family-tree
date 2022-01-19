import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Props, AuthContextType, AuthCredentials } from '../../types';
import { useLoginMutation, useLazyValidateTokenQuery } from '../../services/familyTreeApi';

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);
AuthenticationContext.displayName = "AuthenticationContext";

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [fetchToken] = useLoginMutation();
  const [checkTokenValidity] = useLazyValidateTokenQuery();

  const navigate = useNavigate();

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

  //TODO
  const signout = (callback: VoidFunction) => {
    setUser(null);
    //     callback();
  };

  const validateToken = async (storageCredentials: string, nextLocation: string) => {
    const credentials = JSON.parse(storageCredentials);
    const payload = await checkTokenValidity({ token: credentials.token });

    if (payload.data?.valid) {
      setUser({ ...credentials });
      navigate(nextLocation);
    } else {
      setUser(null);
      navigate('/login');
    }
  }

  return (
    <AuthenticationContext.Provider value={{ user, setUser: setContextUser, signin, signout, validateToken }}>
      {children}
    </AuthenticationContext.Provider >
  );
};

export default AuthenticationProvider;