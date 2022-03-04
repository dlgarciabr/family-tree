import { CSSObject } from '@emotion/react';
import { title as globalTitle } from 'assets/jss';

const main: CSSObject = {
  background: '#FFFFFF',
  position: 'relative',
  zIndex: '3',
};
const mainRaised: CSSObject = {
  margin: '-60px 30px 0px',
  borderRadius: '6px',
  boxShadow:
    '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
};
const faceImg: CSSObject = {
  borderRadius: '50% !important',
  boxShadow:
    '0 5px 15px -8px rgba(0, 0, 0, 0.24), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  // maxWidth: '100%',
  height: 'auto'
};
const profileDiv: CSSObject = {
  textAlign: 'center',
  '& img': {
    maxWidth: '160px',
    width: '100%',
    margin: '0 auto',
    transform: 'translate3d(0, -50%, 0)',
  }
};
const title: CSSObject = {
  ...globalTitle,
  display: 'inline-block',
  position: 'relative',
  marginTop: '30px',
  minHeight: '32px',
  textDecoration: 'none',
};

export {
  main,
  mainRaised,
  faceImg,
  profileDiv,
  title
};