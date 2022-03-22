import React, {
  createContext,
  memo,
  useReducer
} from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Props, AuthCredentials, AuthContextType, AuthContextState, User
} from 'types';
import {
  useSigninMutation,
  useSignupMutation,
  useLazyValidateTokenQuery,
  useLazyGetUserByIdQuery,
  SigninApiResponse,
  ValidateTokenApiResponse
} from 'services/volunteerHubApi';
import { Routes } from 'components/AppRoutes';
import useNotification from 'hooks/notificationHandler';

export const AuthenticationContext = createContext<AuthContextType>({} as AuthContextType);
AuthenticationContext.displayName = 'AuthenticationContext';

export const actions = {
  USER_SIGNED_IN: 'USER_SIGNED_IN',
  USER_SIGNED_UP: 'USER_SIGNED_UP',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT'
};

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [fetchToken] = useSigninMutation();
  const [registerUser] = useSignupMutation();
  const [checkTokenValidity] = useLazyValidateTokenQuery();
  const { showSuccessNotification } = useNotification();

  const navigate = useNavigate();
  const [getUserById] = useLazyGetUserByIdQuery();

  const initialState = {
    user: null, token: null
  };

  const [currentState, dispatch] = useReducer((state: AuthContextState, action: any) => {
    switch (action.type) {
      case 'RESET_STATE':
        return { ...state };
      case actions.USER_SIGNED_IN:
        return {
          ...state,
          user: { ...action.payload.user },
          token: action.payload.token
        };
      case actions.USER_SIGNED_UP:
        return {
          ...state,
          user: { id: action.data.id },
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
    signIn: async (credentials: AuthCredentials, callback: VoidFunction) => {
      fetchToken({ userSigninData: credentials })
        .then(async (payload: any) => {
          if (!payload.error) {
            const { id, token }: SigninApiResponse = payload.data;
            const user = await getUserById({ id }).unwrap();
            dispatch({
              type: actions.USER_SIGNED_IN,
              payload: {
                user,
                token
              }
            });
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
    signOut: (callback?: VoidFunction) => {
      dispatch({ type: actions.USER_LOGGED_OUT });
      sessionStorage.clear();
      showSuccessNotification();
      if (callback) {
        callback();
      }
    },
    signUp: async (userData: User) => {
      registerUser({ userSignupData: userData })
        .then((payload: any) => {
          dispatch({ type: actions.USER_SIGNED_UP, data: payload.data });
          navigate(Routes.HOME);
          showSuccessNotification();
          // sessionStorage.setItem(
          //   'credentials',
          //   JSON.stringify({ ...payload.data })
          // );
        });
    },
    validateToken: async (storageCredentials: string, nextLocation: string) => {
      if (currentState.user) {
        return;
      }
      const { token, id } = JSON.parse(storageCredentials);
      const payload: ValidateTokenApiResponse = await checkTokenValidity({ token }).unwrap();

      if (payload && payload.valid) {
        const user = await getUserById({ id }).unwrap();
        dispatch({
          type: actions.USER_SIGNED_IN,
          payload: {
            user,
            token
          }
        });
        navigate(nextLocation);
      } else {
        dispatch({ type: actions.USER_LOGGED_OUT });
        sessionStorage.clear();
        navigate(Routes.SIGN_IN);
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