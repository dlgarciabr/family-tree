import React from 'react';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { Props } from 'types';
import { myProfileCalled } from 'redux/slices/myProfileSlice';
import { Routes } from 'components/AppRoutes';

const MainArea: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showMyProfile = () => {
    const myId = 76;// TODO retrieve from app context
    dispatch(myProfileCalled(myId));
    navigate(Routes.VOLUNTEER_PROFILE);
  };

  return (
    <div>
      <h3>
        <FormattedMessage id="main.area.title" />
      </h3>
      <Box sx={{ flexGrow: 1 }}>
        <a href="#" onClick={showMyProfile}><FormattedMessage id="myprofile.button.label" /></a>
      </Box>
    </div>
  );
};

export default React.memo(MainArea);