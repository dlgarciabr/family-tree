import React from "react";
import { styled } from '@mui/material/styles';

import { Props as GlobalProps } from 'types';
import { parallax, filter as filterClass, small as smallClass } from 'assets/jss/components/parallax';

interface Props extends GlobalProps {
  filter: boolean,
  style?: string,
  image: string,
  small: boolean
};

const Parallax: React.FC<Props> = (props) => {
  let windowScrollTop;
  if (window.innerWidth >= 768) {
    windowScrollTop = window.pageYOffset / 3;
  } else {
    windowScrollTop = 0;
  }
  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  );
  React.useEffect(() => {
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform);
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform);
      }
    };
  });
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3;
    setTransform("translate3d(0," + windowScrollTop + "px,0)");
  };
  const { filter, children, style, image, small } = props;

  // const parallaxClasses = classNames({
  //   [classes.parallax]: true,
  //   [classes.filter]: filter,
  //   [classes.small]: small,
  //   [className]: className !== undefined,
  // });

  const DivParallax = styled('div')(() => ({
    ...parallax,
    ...filterClass,
    ...smallClass
  }));

  return (
    <DivParallax
      style={{
        backgroundImage: "url(" + image + ")",
        transform: transform,
      }}
    >
      {children}
    </DivParallax>
  );
}

export default Parallax;