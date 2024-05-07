import { useContext } from 'react';
import { PageContext } from './Page';

import s from './Desktop.module.scss';
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { ReactComponent as Bottomicons } from '../assets/img/bottomicons.svg';

type DesktopProps = {
  children: React.ReactNode;
  bypass?: boolean;
};

const Desktop = ({ children, bypass }: DesktopProps) => {
  const { copy } = useContext(PageContext);
  // enable bypass
  if (bypass) {
    return <>{children}</>;
  }

  return (
    <>
      <div className={s.wrap}>
        <Logo />
        <div className={s.content}>
          <h1>{copy('desktop.title')}</h1>
          <h3>{copy('desktop.subtitle')}</h3>
        </div>
        <Bottomicons />
      </div>
      <div className={s.mobile}>{children}</div>
    </>
  );
};

export default Desktop;
