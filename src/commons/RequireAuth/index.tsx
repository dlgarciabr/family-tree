import React, { memo, useEffect } from 'react';
import {
    useNavigate,
    useLocation,
    Navigate,
} from 'react-router-dom';

import { AuthenticationContext } from '../../context/Authentication';
import { useLazyValidateTokenQuery } from '../../services/familyTreeApi';

interface Props {
    children: JSX.Element;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
    const storageCredentials = sessionStorage.getItem('credentials');
    const { user, setUser } = React.useContext(AuthenticationContext);
    const location = useLocation();
    const navigate = useNavigate();
    const [validateToken, validationTokenResult] = useLazyValidateTokenQuery();

    useEffect(() => {
        if (!user && storageCredentials) {
            const credentials = JSON.parse(storageCredentials as string);
            (async () => {
                const payload = await validateToken({ token: credentials.token });
                if (payload.data?.valid) {
                    setUser({ ...credentials });
                    navigate(location);
                }
            })();
        }
    }, []);

    if (!user) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default memo(RequireAuth);