const containerFluid = {
  paddingRight: '15px',
  paddingLeft: '15px',
  marginRight: 'auto',
  marginLeft: 'auto',
  width: '100%',
};
const container = {
  ...containerFluid,
  '@media (min-width: 576px)': {
    maxWidth: '540px',
  },
  '@media (min-width: 768px)': {
    maxWidth: '720px',
  },
  '@media (min-width: 992px)': {
    maxWidth: '960px',
  },
  '@media (min-width: 1200px)': {
    maxWidth: '1140px',
  },
};
const title = {
  color: '#3C4858',
  margin: '1.75rem 0 0.875rem',
  textDecoration: 'none',
  fontWeight: '700',
  fontFamily: '"Roboto Slab", "Times New Roman", serif'
};

const gridSkeletonMultipleLines = {
  display: 'flex',
  flexDirection: 'column'
};

const width100 = {
  width: '100%'
}

export {
  container,
  title,
  gridSkeletonMultipleLines,
  width100
};