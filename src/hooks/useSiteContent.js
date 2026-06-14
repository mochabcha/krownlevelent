import { useCallback, useEffect, useMemo, useState } from 'react';
import { mergeSiteContent } from '../content/siteContent';

export function useSiteContent() {
  const [remoteContent, setRemoteContent] = useState(null);
  const [status, setStatus] = useState('loading');

  const refresh = useCallback(() => {
    setStatus('loading');
    return fetch('/api/site-content')
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load site content');
        return response.json();
      })
      .then((data) => {
        setRemoteContent(data);
        setStatus('ready');
        return data;
      })
      .catch(() => {
        setStatus('fallback');
        return null;
      });
  }, []);

  useEffect(() => {
    let alive = true;
    refresh().then((data) => {
      if (!alive || data) return;
      setStatus('fallback');
    });

    return () => {
      alive = false;
    };
  }, [refresh]);

  const content = useMemo(() => mergeSiteContent(remoteContent), [remoteContent]);
  const mediaById = useMemo(
    () => Object.fromEntries((content.media || []).map((item) => [item.id || item._id, item])),
    [content.media]
  );

  return { content, mediaById, status, refresh };
}
