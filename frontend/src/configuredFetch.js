const originalFetch = global.fetch;

export const applyBaseUrlToFetch = (baseUrl) => {
  global.fetch = (url, options) => {
    // If the URL is already (http/https), do not touch it
    if (url.startsWith('http')) {
      return originalFetch(url, options);
    }
    const finalUrl = baseUrl + url;
    return originalFetch(finalUrl, options);
  };
};