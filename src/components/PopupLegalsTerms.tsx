import { useContext, useState } from 'react';
import { PageContext } from './Page';
import Button, { ButtonVariants } from '@components/Button';
import FormInputCheckbox from './FormInputCheckbox';
import s from './PopupLegalsTerms.module.scss';

const withLink = (text: string) => {
  // Finds like between astrixes (.. *link* ...)
  const regex = /\*(\S(.*?\S)?)\*/gm;
  const textWithHTML = text.replace(
    regex,
    `<a href="/terms-of-use" target="_blank" rel="noreferrer noopener">$1</a>`
  );

  return <span dangerouslySetInnerHTML={{ __html: textWithHTML }} />;
};

const PopupLegalsTerms = () => {
  const { copy, cookies } = useContext(PageContext);
  const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

  return (
    <div className={s.termsContent}>
      <h1
        className={s.title}
        dangerouslySetInnerHTML={{ __html: copy('terms.title') }}
      />
      <p className={s.topParagraph}>{withLink(copy('terms.read'))}</p>
      <div className={s.checkTerms}>
        <FormInputCheckbox
          checked={acceptTerms}
          onChange={() => {
            setAcceptTerms(!acceptTerms);
          }}
        />
        <p className={s.checkTermsText}>{copy('terms.copy')}</p>
      </div>
      <Button
        variant={acceptTerms ? null : ButtonVariants.DISABLED}
        onClick={() => {
          cookies.setAccepted('terms', true);
          cookies.setShowPopup(false);
        }}
        disabled={!acceptTerms}
      >
        {copy('terms.CTA')}
      </Button>
      <p
        className={s.bottomParagraph}
        dangerouslySetInnerHTML={{ __html: copy('terms.legals') }}
      />
    </div>
  );
};

export default PopupLegalsTerms;
