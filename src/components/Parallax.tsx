import React from 'react';
import { styled } from '@mui/material/styles';

import { Props as GlobalProps } from 'types';
import { parallax, filter as filterClass, small as smallClass } from 'assets/jss/components/parallax';

interface Props extends GlobalProps {
  image: string,
  filter?: boolean,
  small?: boolean
}

const defaultProps = {
  filter: true,
  small: true
};

const Parallax: React.FC<Props> = (props) => {
  const {
    filter,
    children,
    image,
    small
  } = props;

  const defaultScrollTop = window.pageYOffset / 3;
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = defaultScrollTop;
  } else {
    windowScrollTop = 0;
  }

  const [transform, setTransform] = React.useState(
    `translate3d(0,${windowScrollTop}px,0)`
  );

  const resetTransform = () => {
    setTransform(`translate3d(0,${defaultScrollTop}px,0)`);
  };

  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener('scroll', resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener('scroll', resetTransform);
      }
    };
  });

  const DivParallax = styled('div')(() => ({
    ...parallax,
    ...(filter === true && filterClass),
    ...(small === true && smallClass)
  }));

  return (
    <DivParallax
      style={{
        backgroundImage: `url(${image})`,
        transform,
      }}
    >
      {children}
    </DivParallax>
  );
};

Parallax.defaultProps = defaultProps;

export default Parallax;