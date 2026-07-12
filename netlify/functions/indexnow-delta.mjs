const isHash = (value) => /^[a-f0-9]{64}$/i.test(String(value || ''));

export const manifestEntryMap = (manifest, host) => {
  if (!manifest || manifest.version !== 1 || !manifest.entries || typeof manifest.entries !== 'object') {
    return {};
  }

  const hostPrefix = `https://${host}/`;
  return Object.fromEntries(
    Object.entries(manifest.entries)
      .filter(([url, entry]) => url.startsWith(hostPrefix) && isHash(entry?.hash))
      .map(([url, entry]) => [url, entry.hash])
      .sort(([left], [right]) => left.localeCompare(right))
  );
};

export const resolveIndexNowDelta = (currentEntries, previousEntries = {}) => {
  const currentUrls = Object.keys(currentEntries).sort();
  const previousUrls = Object.keys(previousEntries).sort();
  const changedUrls = currentUrls.filter((url) => currentEntries[url] !== previousEntries[url]);
  const deletedUrls = previousUrls.filter((url) => !(url in currentEntries));

  return {
    urlList: [...changedUrls, ...deletedUrls].sort(),
    changedUrlCount: changedUrls.length,
    deletedUrlCount: deletedUrls.length
  };
};
