import { useState, useEffect, useContext } from 'react';
import { PageContext } from './Page';
import s from './Landscape.module.scss';
import useMobileDetect from '@hooks/useMobileDetect';
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { ReactComponent as Bottomicons } from '../assets/img/bottomicons.svg';

type LandscapeProps = {
  children: React.ReactNode;
};

const Landscape = ({ children }: LandscapeProps) => {
  const { copy } = useContext(PageContext);
  const isMobileDevice = useMobileDetect();
  const [isMobileLandscape, setIsMobileLandscape] = useState(false);

  useEffect(() => {
    const detect = () => {
      setIsMobileLandscape(
        isMobileDevice &&
          typeof window !== 'undefined' &&
          window.matchMedia('screen and (orientation:landscape)').matches
      );
    };

    window.addEventListener('resize', detect);
    screen?.orientation?.addEventListener('change', detect);

    detect();

    return () => {
      window.removeEventListener('resize', detect);
      screen?.orientation?.removeEventListener('change', detect);
    };
  });

  if (isMobileLandscape) {
    return (
      <div className={s.wrap}>
        <Logo />
        <div className={s.content}>
          <h1>{copy('landscape.title')}</h1>
          <h3>{copy('landscape.copy')}</h3>
        </div>
        <Bottomicons />
      </div>
    );
  }

  return <>{children}</>;
};

export default Landscape;
