import { useContext } from 'react';
import { PageContext } from './Page';
import Button, { ButtonVariants } from '@components/Button';
import s from './PopupLegalsCookies.module.scss';

type PopupLegalsCookiesProps = {
  onCookieSettings: () => void;
};

const PopupLegalsCookies = ({ onCookieSettings }: PopupLegalsCookiesProps) => {
  const { copy, cookies } = useContext(PageContext);

  return (
    <div className={s.cookiesContent}>
      <h1
        className={s.title}
        dangerouslySetInnerHTML={{ __html: copy('cookies.title') }}
      />
      <div
        className={s.topParagraph}
        dangerouslySetInnerHTML={{ __html: copy('cookies.copy') }}
      />
      <Button
        onClick={() => {
          cookies.setAccepted('cookies', true);
        }}
      >
        {copy('cookies.CTA.accept')}
      </Button>
      <Button
        variant={ButtonVariants.BORDER_MIDNIGHTBLUE}
        onClick={onCookieSettings}
      >
        {copy('cookies.CTA.settings')}
      </Button>
      <div
        className={s.bottomParagraph}
        dangerouslySetInnerHTML={{ __html: copy('cookies.legals') }}
      />
    </div>
  );
};

export default PopupLegalsCookies;
