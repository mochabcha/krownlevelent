import { useEffect, useState } from 'react';

export function useEditMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setEnabled(params.has('edit'));
  }, []);

  return enabled;
}
