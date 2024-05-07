import classNames from 'classnames';

import s from './Popup.module.scss';
import { ReactComponent as Close } from '../assets/img/close.svg';

export type PopupProps = {
  show: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

const Popup = ({ children, show, onClose }: PopupProps) => {
  return (
    <div
      className={classNames({
        [s.wrap]: true,
        [s.show]: show
      })}
    >
      <div className={s.overlay}></div>
      <div className={s.content}>
        {onClose && (
          <span
            className={s.closeIcon}
            onClick={() => {
              onClose && onClose();
            }}
          >
            <Close />
          </span>
        )}
        {children}
      </div>
    </div>
  );
};

export default Popup;
