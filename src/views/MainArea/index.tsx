import React from 'react';

import Box from '@mui/material/Box';

import { Props } from '../../types';
import TopBar from './TopBar';

const MainArea: React.FC<Props> = () => {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <TopBar />
      </Box>
    </div>
  );
};

export default MainArea;