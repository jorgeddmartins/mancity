import { useContext } from 'react';
import { PageContext } from './Page';
import s from './PageTermsOfUse.module.scss';
// import { ReactComponent as Close } from '../assets/img/close.svg';

const PageTermsOfUse = () => {
  const { copy } = useContext(PageContext);

  return (
    <div className={s.wrap}>
      <div className={s.titleContent}>
        <h2>{copy('terms.use-title')}</h2>
        {/* <span onClick={onClose}>
          <Close />
        </span> */}
      </div>
      <div className={s.content}>
        <h4>{copy('cookies.settings.sub.title')}</h4>
        <div
          className={s.termsCopy}
          dangerouslySetInnerHTML={{ __html: copy('terms.use-copy') }}
        />
      </div>
    </div>
  );
};

export default PageTermsOfUse;
