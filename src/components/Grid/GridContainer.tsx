import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid, GridProps
} from '@mui/material';

const StyledGrid = styled(Grid)(() => ({
  marginRight: '-15px',
  marginLeft: '-15px',
  width: 'auto',
}));

const GridContainer: React.FC<GridProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <StyledGrid container {...rest}>
      {children}
    </StyledGrid>
  );
};

export default GridContainer;