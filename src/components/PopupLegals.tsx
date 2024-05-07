import { useContext, useState } from 'react';
import { PageContext } from './Page';
import Popup from './Popup';
import PopupLegalsTerms from '@components/PopupLegalsTerms';
import PopupLegalsCookieSettings from '@components/PopupLegalsCookieSettings';
import PopupLegalsCookies from '@components/PopupLegalsCookies';
import s from './PopupLegals.module.scss';

const PopupLegals = () => {
  const { cookies } = useContext(PageContext);
  return (
    <>
      <Popup show={cookies.showPopup}>
        <div className={s.wrap}>
          {!cookies.functional ? (
            <PopupLegalsCookies
              onCookieSettings={() => cookies.setShowSettings(true)}
            />
          ) : (
            <PopupLegalsTerms />
          )}
        </div>
      </Popup>
      {cookies.showSettings && (
        <PopupLegalsCookieSettings
          onSave={() => {
            cookies.setShowSettings(false);

            if (cookies.terms) {
              cookies.setShowPopup(false);
            }
          }}
          onClose={() => cookies.setShowSettings(false)}
        />
      )}
    </>
  );
};

export default PopupLegals;
