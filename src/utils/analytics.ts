type GAParams = Record<string, unknown>;

export const sendCTA = (params: GAParams, path: string) => {
  if (typeof gtag === 'undefined') {
    console.error('no gtag found');
    return;
  }
  gtag('event', 'cta', {
    ...params,
    page_title: path
  });
};

export const sendEvent = (name: string, params: GAParams) => {
  if (typeof gtag === 'undefined') {
    console.error('no gtag found');
    return;
  }
  gtag('event', name, {
    ...params
  });
};

export const sendOutbound = (params: GAParams, path: string) => {
  if (typeof gtag === 'undefined') {
    console.error('no gtag found');
    return;
  }
  gtag('event', 'outbound', {
    ...params,
    page_title: path
  });
};

export const sendPageview = (path: string) => {
  if (typeof gtag === 'undefined') {
    console.error('no gtag found');
    return;
  }
  gtag('event', 'page_view', {
    page_title: path,
    page_location: path
  });
};

export const consent = () => {
  gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted'
  });
};
