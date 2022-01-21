import React, {
  createContext,
  memo,
  useReducer
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Props, AuthCredentials, AuthContextType, AuthContextState
} from 'types';
import {
  useLoginMutation, useLazyValidateTokenQuery
} from 'services/familyTreeApi';

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);
AuthenticationContext.displayName = 'AuthenticationContext';

export const actions = {
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT'
};

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [fetchToken] = useLoginMutation();
  const [checkTokenValidity] = useLazyValidateTokenQuery();

  const navigate = useNavigate();

  const initialState = {
    user: null, token: null
  };

  const [currentState, dispatch] = useReducer((state: AuthContextState, action: any) => {
    switch (action.type) {
      case 'RESET_STATE':
        return { ...state };
      case actions.USER_LOGGED_IN:
        return {
          ...state,
          user: { id: action.data.id },
          token: action.data.token
        };
      case actions.USER_LOGGED_OUT:
        return {
          ...state,
          user: null,
          token: null
        };
      default:
        throw new Error();
    }
  }, initialState);

  const operations = {
    signin: async (credentials: AuthCredentials, callback: VoidFunction) => {
      fetchToken({ userLoginData: credentials })
        .then((payload: any) => {
          if (!payload.error) {
            dispatch({ type: actions.USER_LOGGED_IN, data: payload.data });
            sessionStorage.setItem(
              'credentials',
              JSON.stringify({ ...payload.data })
            );
            if (callback) {
              callback();
            }
          }
        })
        .catch(() => {
          // handled by error middleware
        });
    },
    signout: (callback?: VoidFunction) => {
      dispatch({ type: actions.USER_LOGGED_OUT });
      sessionStorage.clear();
      if (callback) {
        callback();
      }
    },
    validateToken: async (storageCredentials: string, nextLocation: string) => {
      if (currentState.user) {
        return;
      }
      const credentials = JSON.parse(storageCredentials);
      const payload = await checkTokenValidity({ token: credentials.token });

      if (payload.data && payload.data.valid) {
        dispatch({ type: actions.USER_LOGGED_IN, data: payload.data });
        navigate(nextLocation);
      } else {
        dispatch({ type: actions.USER_LOGGED_OUT });
        sessionStorage.clear();
        navigate('/login');
      }
    }
  };

  return (
    <AuthenticationContext.Provider value={{ state: currentState, operations }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default memo(AuthenticationProvider);