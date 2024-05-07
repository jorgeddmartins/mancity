import { useContext } from 'react';
import { PageContext } from './Page';
import s from './Error.module.scss';
import Button, { ButtonVariants } from './Button';
import { ReactComponent as Logo } from '../assets/img/logo.svg';
import { ReactComponent as Bottomicons } from '../assets/img/bottomicons.svg';
import { ReactComponent as Face } from '../assets/img/face.svg';

type ErrorProps = {
  eventId?: string;
  error?: Error;
  notFound?: boolean;
};

export default function Error({ notFound }: ErrorProps) {
  return (
    <div className={s.wrap}>
      <div className={s.errorContainer}>
        <div className={s.logo}>
          <Logo />
        </div>
        <div className={s.content}>
          {!notFound && <Face />}
          {notFound ? (
            <h1 className={s.error404}>
              Error <span>404</span>
            </h1>
          ) : (
            <h1 className={s.generic}>Whoops, something went wrong</h1>
          )}
          <span className={s.message}>
            {notFound
              ? 'Sorry, the page you’re looking for is not found.'
              : 'Try giving your browser a refresh.'}
          </span>
          {!notFound && (
            <Button
              variant={ButtonVariants.MIDNIGHTBLUE}
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          )}
        </div>
        <div className={s.bottomContent}>
          <Bottomicons />
        </div>
      </div>
    </div>
  );
}
