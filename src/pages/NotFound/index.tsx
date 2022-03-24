import { Typography } from '@mui/material';
import { Routes } from 'components/AppRoutes';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Props } from 'types';

const NotFound: React.FC<Props> = () => (
  <>
    <div>page not found</div>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      <Link to={Routes.HOME}>
        <FormattedMessage id="default.back.button.label" />
      </Link>
    </Typography>
  </>
);

export default React.memo(NotFound);