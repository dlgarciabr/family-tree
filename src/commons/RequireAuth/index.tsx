import React, { memo, useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

import { AuthenticationContext } from 'context/Authentication';
import { useLazyValidateTokenQuery } from 'services/familyTreeApi';

interface Props {
  children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const [checkTokenValidity] = useLazyValidateTokenQuery();
  const storageCredentials = sessionStorage.getItem('credentials');
  const { settings: { user }, dispatch } = React.useContext(AuthenticationContext);
  const location = useLocation();
  const navigate = useNavigate();

  const validateToken = async (storageCredentials: string, nextLocation: string) => {
    if (user) {
      return;
    }
    const credentials = JSON.parse(storageCredentials);
    const payload = await checkTokenValidity({ token: credentials.token });

    if (payload.data && payload.data.valid) {
      dispatch({ type: "USER_LOGGEDIN", user: { ...credentials } });
      navigate(nextLocation);
    } else {
      dispatch({ type: "USER_LOGGEDIN", user: null });
      sessionStorage.clear();
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!user && storageCredentials) {
      (async () => {
        validateToken(storageCredentials, location.pathname);
      })();
    }
  }, []);

  if (!user && !storageCredentials) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default memo(RequireAuth);