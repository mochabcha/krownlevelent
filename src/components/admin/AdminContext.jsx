import { createContext, useContext, useMemo, useState } from 'react';

const AdminContext = createContext(null);

export function AdminProvider({ enabled, content, mediaById, refreshContent, children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [editorTarget, setEditorTarget] = useState(null);
  const [mediaTarget, setMediaTarget] = useState(null);
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  const value = useMemo(
    () => ({
      enabled,
      authenticated,
      setAuthenticated,
      content,
      mediaById,
      refreshContent,
      editorTarget,
      mediaTarget,
      leftOpen,
      rightOpen,
      openEditor(target) {
        if (!enabled || !authenticated) return;
        setEditorTarget(target || { type: 'menu' });
        setRightOpen(true);
      },
      closeEditor() {
        setRightOpen(false);
      },
      openMedia(target) {
        if (!enabled || !authenticated) return;
        setMediaTarget(target || null);
        setLeftOpen(true);
      },
      closeMedia() {
        setLeftOpen(false);
      },
    }),
    [authenticated, content, editorTarget, enabled, leftOpen, mediaById, mediaTarget, refreshContent, rightOpen]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  return useContext(AdminContext) || { enabled: false, authenticated: false };
}
