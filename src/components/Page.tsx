import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useMount } from 'react-use';
import * as Sentry from '@sentry/react';
import { useLocalStorage } from 'react-use';

import Meta from './Meta';
import PopupLegals from './PopupLegals';
import { consent } from '../utils/analytics';
import Landscape from '@components/Landscape';
import Desktop from '@components/Desktop';
import Error from '@components/Error';

export type Page = {
  copy: (key: string) => string;
  cookies: {
    functional: boolean;
    analytics: boolean;
    terms: boolean;
    setAccepted: (
      key: 'functional' | 'analytics' | 'terms' | 'cookies',
      value: boolean
    ) => void;
    showPopup: boolean;
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>;
    showSettings: boolean;
    setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export const PageContext = createContext<Page>({
  copy: () => '',
  cookies: null
});

type PageProps = {
  copy: Record<string, string>;
  children: React.ReactNode;
  allowDesktop?: boolean;
  noCookies?: boolean;
};

const Page = ({ children, copy, allowDesktop, noCookies }: PageProps) => {
  const [acceptedTerms, setAcceptedTerms] = useLocalStorage(
    'accept-terms',
    false
  );
  const [acceptedFunctionalCookies, setFunctionalCookies] = useLocalStorage(
    'accept-functional',
    false
  );
  const [acceptedAnalyticsCookies, setAnalyticsCookies] = useLocalStorage(
    'accept-analytics',
    false
  );
  const [showCookiePopup, setShowCookiePopup] = useState<boolean>(null);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [keysOnly, setKeysOnly] = useState(false);

  const copyGetter = useCallback(
    (key: string) => {
      if (!copy[key]) {
        console.error(`Copy key not found: ${key}`);
        if (
          typeof window !== 'undefined' &&
          window.location.host.includes('staging')
        ) {
          Sentry.captureMessage(`Copy key not found '${key}'`);
        }
      }
      return keysOnly ? key : copy[key];
    },
    [keysOnly, copy]
  );

  const acceptCookies = useCallback(
    (key: 'functional' | 'analytics' | 'terms' | 'cookies', value: boolean) => {
      if (key === 'functional' || key === 'cookies') {
        setFunctionalCookies(value);
      }
      if (key === 'analytics' || key === 'cookies') {
        setAnalyticsCookies(value);
        consent();
      }
      if (key === 'terms') {
        setAcceptedTerms(value);
      }
    },
    [setFunctionalCookies, setAnalyticsCookies, setAcceptedTerms]
  );

  useEffect(() => {
    const keydown = (evt: KeyboardEvent) => {
      if (
        evt.ctrlKey &&
        evt.shiftKey &&
        (evt.key === 'T' || evt.keyCode === 88)
      ) {
        setKeysOnly(k => !k);
        evt.preventDefault();
      }
    };

    window.addEventListener('keydown', keydown);

    return () => {
      window.removeEventListener('keydown', keydown);
    };
  }, []);

  useMount(() => {
    // for dev purposes show the copy so we
    if (process.env.NODE_ENV === 'development') {
      console.dir(copy);
    }

    try {
      const functional =
        JSON.parse(localStorage.getItem('accept-functional')) || false;
      const analytics =
        JSON.parse(localStorage.getItem('accept-analytics')) || false;

      if (!functional) {
        setShowCookiePopup(true);
      }
      if (analytics) {
        consent();
      }
    } catch (e) {
      console.warn('Localstorage not supported, always showing cookie popup');
    }
  });

  return (
    <PageContext.Provider
      value={{
        copy: copyGetter,
        cookies: {
          terms: acceptedTerms,
          analytics: acceptedAnalyticsCookies,
          functional: acceptedFunctionalCookies,
          setAccepted: acceptCookies,
          showPopup: showCookiePopup,
          setShowPopup: setShowCookiePopup,
          showSettings: showCookieSettings,
          setShowSettings: setShowCookieSettings
        }
      }}
    >
      <Meta copy={copy} />
      <Desktop bypass={allowDesktop}>
        <Landscape>
          {children}
          {showCookiePopup !== null && !noCookies && <PopupLegals />}
        </Landscape>
      </Desktop>
    </PageContext.Provider>
  );
};

export default Page;
