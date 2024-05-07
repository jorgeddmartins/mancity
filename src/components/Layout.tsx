import { ReactNode } from 'react';
import s from './Layout.module.scss';

type LayoutProps = {
  showFooter?: boolean;
  children: ReactNode;
};

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <div>
      {children}
      {showFooter && <div className={s.footer} />}
    </div>
  );
};

export default Layout;
