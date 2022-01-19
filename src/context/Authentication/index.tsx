import React, {
  createContext,
  memo,
  useReducer
} from 'react';
import { useNavigate } from 'react-router-dom';

import { Props, AuthCredentials, AuthContextType, AuthenticationSettings } from '../../types';
import { useLoginMutation, useLazyValidateTokenQuery } from '../../services/familyTreeApi';

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);
AuthenticationContext.displayName = 'AuthenticationContext';

export const actions = {
  USER_LOGGEDIN: 'USER_LOGGEDIN'
};

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [fetchToken] = useLoginMutation();
  const [checkTokenValidity] = useLazyValidateTokenQuery();

  const navigate = useNavigate();

  const signin = async (credentials: AuthCredentials, callback: VoidFunction) => {
    try {
      fetchToken({ userLoginData: credentials })
        .then((payload) => {
          dispatch({ type: actions.USER_LOGGEDIN, user: { ...payload } });
          if (callback) {
            callback();
          }
        })
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
    if (settings.user) {
      return;
    }
    const credentials = JSON.parse(storageCredentials);
    const payload = await checkTokenValidity({ token: credentials.token });

    if (payload.data && payload.data.valid) {
      dispatch({ type: actions.USER_LOGGEDIN, user: { ...credentials } });
      navigate(nextLocation);
    } else {
      dispatch({ type: actions.USER_LOGGEDIN, user: null });
      sessionStorage.clear();
      navigate('/login');
    }
  };

  const initialAuthenticationSettings: AuthenticationSettings = {
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