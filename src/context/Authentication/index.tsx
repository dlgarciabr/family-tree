import React, {
  createContext,
  useState,
  useMemo,
  memo,
  useReducer
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Props,/*, AuthContextType, */AuthCredentials } from '../../types';
import { useLoginMutation, useLazyValidateTokenQuery } from '../../services/familyTreeApi';

interface AuthenticationSettings {
  user: any;
  // setUser: (user: any) => void;
  signin: (credentials: AuthCredentials, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  validateToken: (storageCredentials: string, nextLocation: string) => void;
}

interface AuthContextType {
  settings: AuthenticationSettings;
  dispatch: React.Dispatch<any>;
}

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);
AuthenticationContext.displayName = 'AuthenticationContext';

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  // const [user, setUser] = useState<any>(null);
  const [fetchToken] = useLoginMutation();
  const [checkTokenValidity] = useLazyValidateTokenQuery();

  const navigate = useNavigate();

  // const setContextUser = (newUser: any) => {
  //   setUser(newUser);
  // };

  const signin = async (credentials: AuthCredentials, callback: VoidFunction) => {
    try {
      // console.log('signin:1')
      // const payload = await fetchToken({ userLoginData: credentials }).unwrap();
      // dispatch({ type: "USER_LOGGEDIN", payload: { ...payload } });
      fetchToken({ userLoginData: credentials })
        .then((payload) => {
          // console.log('signin:afterFetch_then')
          // console.log('signin:2')
          // console.log('signin:payload:', payload)
          dispatch({ type: "USER_LOGGEDIN", user: { ...payload } });
          // setUser({ ...data });
          // sessionStorage.setItem(
          //   'credentials',
          //   JSON.stringify({ ...data })
          // );
          if (callback) {
            callback();
          }
        })
      //   .catch((error) => console.log('signin:afterFetch:error:', error));
      // console.log('signin:2')
      // // console.log('signin:payload', payload)
      // // console.log("signin:setUser:", payload)
      // // setUser(payload);
      // sessionStorage.setItem(
      //   'credentials',
      //   JSON.stringify({ ...payload })
      //   // JSON.stringify({ "asdasd": "sdsd" })
      // );
      // if (callback) {
      //   callback();
      // }
    } catch (error) {
      // handled by error middleware
    }
  };

  // TODO
  const signout = (callback: VoidFunction) => {
    // setUser(null);
    callback();
  };

  const validateToken = async (storageCredentials: string, nextLocation: string) => {
    // console.log("validateToken:storageCredentials", storageCredentials);
    // console.log("validateToken:storageCredentials", storageCredentials);
    // console.log("validateToken:setUser:", setUser)
    // console.log("validateToken:user:", settings.user)
    if (settings.user) {
      return;
    }
    const credentials = JSON.parse(storageCredentials);
    const payload = await checkTokenValidity({ token: credentials.token });
    if (payload.data?.valid) {
      // setUser({ ...credentials });
      dispatch({ type: "USER_LOGGEDIN", user: { ...credentials } });
      navigate(nextLocation);
    } else {
      // setUser(null);
      dispatch({ type: "USER_LOGGEDIN", user: null });
      navigate('/login');
    }
  };

  const initialAuthenticationSettings: AuthenticationSettings = {
    // setUser,
    signin,
    signout,
    validateToken,
    user: null
  };

  const [settings, dispatch] = useReducer((state: AuthenticationSettings, action: any) => {
    switch (action.type) {
      case 'RESET_STATE':
        return { ...state };
      case 'USER_LOGGEDIN':
        // console.log('dispatcher:USER_LOGGEDIN')
        return {
          ...state,
          user: action.user
        };
      default:
        throw new Error();
    }
  }, {
    ...initialAuthenticationSettings
  });

  // const providerProps = useMemo(() => ({
  //   user, setUser, signin, signout, validateToken
  // }), []);

  return (
    // <AuthenticationContext.Provider value={{ user, setUser: setContextUser, signin, signout, validateToken }}>
    // <AuthenticationContext.Provider value={providerProps}>
    <AuthenticationContext.Provider value={{ settings, dispatch }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default memo(AuthenticationProvider);