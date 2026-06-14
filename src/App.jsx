import HomePage from './components/pages/HomePage';
import { AdminProvider } from './components/admin/AdminContext';
import { useEditMode } from './hooks/useEditMode';
import { useSiteContent } from './hooks/useSiteContent';

export default function App() {
  const editMode = useEditMode();
  const { content, mediaById, refresh } = useSiteContent();

  return (
    <AdminProvider enabled={editMode} content={content} mediaById={mediaById} refreshContent={refresh}>
      <HomePage content={content} mediaById={mediaById} />
    </AdminProvider>
  );
}
