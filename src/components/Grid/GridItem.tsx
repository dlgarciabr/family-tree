import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid, GridProps
} from '@mui/material';

const StyledGrid = styled(Grid)(() => ({
  position: 'relative',
  width: '100%',
  minHeight: '1px',
  paddingRight: '15px',
  paddingLeft: '15px',
  flexBasis: 'auto',
}));

const GridItem: React.FC<GridProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <StyledGrid item {...rest}>
      {children}
    </StyledGrid>
  );
};

export default GridItem;
