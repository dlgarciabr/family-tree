import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import { Props } from '../../types';
import TopBar from './TopBar';

const MainArea: React.FC<Props> = () => (
  <div>
    <Box sx={{ flexGrow: 1 }}>
      <TopBar />
      <Link to="/dummy">Dummy</Link>
    </Box>
  </div>
);

export default React.memo(MainArea);