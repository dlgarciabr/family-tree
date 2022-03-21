import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Props } from 'types';
import { Routes } from 'components/AppRoutes';
import { AuthenticationContext } from 'context/Authentication';

const MainArea: React.FC<Props> = () => {
  const {
    state: { user }
  } = React.useContext(AuthenticationContext);

  const navigate = useNavigate();

  const showMyProfile = () => {
    navigate(`${Routes.VOLUNTEER_PROFILE}${user?.id}`);
  };

  const showProtectedDummy = () => {
    navigate(Routes.PROTECTED_DUMMY);
  };

  return (
    <div>
      <h3>
        <FormattedMessage id="main.area.title" />
      </h3>
      <Box sx={{ flexGrow: 1 }}>
        <a href="#" onClick={showMyProfile}><FormattedMessage id="myprofile.button.label" /></a><br />
        <a href="#" onClick={showProtectedDummy}>Show protected dummy</a>
      </Box>
    </div>
  );
};

export default React.memo(MainArea);