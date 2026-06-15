import { useEffect, useMemo, useState } from 'react';
import { Button, Icon, Input, Textarea, Typography } from '../atoms';
import { useAdmin } from '../admin/AdminContext';

const editableGroups = [
  { key: 'general', label: 'General', kind: 'settings' },
  { key: 'events', label: 'Events', kind: 'events' },
  { key: 'testimonials', label: 'Testimonials', kind: 'testimonials' },
  { key: 'hero', label: 'Hero', kind: 'content' },
  { key: 'brand-ecosystem', label: 'KLE Focus Points', kind: 'content' },
  { key: 'founder-bio', label: 'Founder Bio', kind: 'content' },
  { key: 'credentials', label: 'Credentials', kind: 'content' },
  { key: 'quote-banner', label: 'Quote Banner', kind: 'content' },
  { key: 'vision', label: 'Vision', kind: 'content' },
  { key: 'wellness', label: "Genie's Healing Elements", kind: 'content' },
  { key: 'plant-klub', label: 'Plant Klub', kind: 'content' },
  { key: 'sage-defense', label: 'SAGE Defense Systems', kind: 'content' },
  { key: 'sign-up', label: 'Signup Form Copy', kind: 'content' },
  { key: 'contact', label: 'Contact Copy', kind: 'content' },
  { key: 'secondary-cta', label: 'Secondary CTA', kind: 'content' },
  { key: 'footer', label: 'Footer', kind: 'content' },
];

function api(path, options = {}) {
  return fetch(path, {
    credentials: 'include',
    headers: options.body instanceof FormData ? undefined : { 'Content-Type': 'application/json' },
    ...options,
  }).then(async (response) => {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const error = new Error(data.error || 'Request failed');
      error.status = response.status;
      throw error;
    }
    return data;
  });
}

function AuthPanel() {
  const admin = useAdmin();
  const [state, setState] = useState(null);
  const [form, setForm] = useState({ username: '', setupCode: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    api('/api/auth/state')
      .then((nextState) => {
        setState(nextState);
        setForm((current) => ({ ...current, username: nextState.username || current.username }));
      })
      .catch((err) => setError(err.message));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    try {
      if (state?.setupRequired) {
        await api('/api/auth/setup', { method: 'POST', body: JSON.stringify(form) });
      } else {
        await api('/api/auth/login', { method: 'POST', body: JSON.stringify(form) });
      }
      admin.setAuthenticated(true);
      await admin.refreshContent();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!state && !error) {
    return (
      <div className="fixed inset-0 z-[100] bg-dark-bg/95 text-white flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-dark-surface border border-white/10 rounded-2xl p-8 shadow-2xl">
          <Typography variant="eyebrow" className="text-brand-aqua-light mb-2">
            Admin Portal
          </Typography>
          <Typography variant="h4" className="text-white">
            Checking admin status...
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] bg-dark-bg/95 text-white flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-md bg-dark-surface border border-white/10 rounded-2xl p-8 space-y-5 shadow-2xl">
        <div>
          <Typography variant="eyebrow" className="text-brand-aqua-light mb-2">
            Admin Portal
          </Typography>
          <Typography variant="h3" className="text-white">
            {state?.setupRequired ? 'Set Admin Password' : 'Sign In'}
          </Typography>
        </div>
        <Input placeholder="Username" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
        {state?.setupRequired && (
          <Input placeholder="Setup code" value={form.setupCode} onChange={(e) => setForm({ ...form, setupCode: e.target.value })} required />
        )}
        <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {state?.setupRequired && (
          <Input type="password" placeholder="Confirm password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} required />
        )}
        {state?.setupRequired && (
          <Typography variant="small" className="text-white/60">
            Password must be at least 12 characters. Spaces are allowed.
          </Typography>
        )}
        {error && <Typography variant="small" className="text-red-300">{error}</Typography>}
        <Button variant="cta" type="submit" className="w-full justify-center">
          {state?.setupRequired ? 'Save Password' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}

function JsonEditor({ title, value, onSave }) {
  const [draft, setDraft] = useState(JSON.stringify(value || {}, null, 2));
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');

  const save = async () => {
    setError('');
    try {
      await onSave(JSON.parse(draft));
      setDirty(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <Typography variant="h4" className="text-white">{title}</Typography>
      <Textarea
        rows={18}
        value={draft}
        onChange={(event) => {
          setDraft(event.target.value);
          setDirty(true);
        }}
        className="font-mono text-sm bg-white/10 text-white border-white/20"
      />
      {error && <Typography variant="small" className="text-red-300">{error}</Typography>}
      <div className="flex gap-3">
        <Button variant="cta" type="button" onClick={save}>
          <Icon name="save" size={16} className="mr-2" />
          Save
        </Button>
        {dirty && <Typography variant="small" className="text-brand-gold self-center">Unsaved changes</Typography>}
      </div>
    </div>
  );
}

function ItemEditor({ kind, item, onSave }) {
  const [draft, setDraft] = useState(item || {});
  const [dirty, setDirty] = useState(false);
  const fields = kind === 'events'
    ? ['title', 'date', 'time', 'location', 'description', 'price', 'ctaText', 'ctaHref']
    : ['quote', 'author', 'role'];

  const update = (field, value) => {
    setDraft({ ...draft, [field]: value });
    setDirty(true);
  };

  return (
    <div className="space-y-4">
      <Typography variant="h4" className="text-white">{draft.id ? 'Edit Item' : 'New Item'}</Typography>
      {fields.map((field) => (
        field === 'description' || field === 'quote' ? (
          <Textarea key={field} rows={4} value={draft[field] || ''} onChange={(e) => update(field, e.target.value)} placeholder={field} className="bg-white/10 text-white border-white/20" />
        ) : (
          <Input key={field} value={draft[field] || ''} onChange={(e) => update(field, e.target.value)} placeholder={field} className="bg-white/10 text-white border-white/20" />
        )
      ))}
      <label className="flex items-center gap-2 text-white/80">
        <input type="checkbox" checked={draft.active !== false} onChange={(e) => update('active', e.target.checked)} />
        Active
      </label>
      <Button variant="cta" type="button" onClick={() => onSave(draft).then(() => setDirty(false))}>
        <Icon name="save" size={16} className="mr-2" />
        Save
      </Button>
      {dirty && <Typography variant="small" className="text-brand-gold">Unsaved changes</Typography>}
    </div>
  );
}

function RightDrawer() {
  const admin = useAdmin();
  const [level, setLevel] = useState('menu');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!admin.editorTarget) return;
    const target = admin.editorTarget;
    if (target.group) {
      const group = editableGroups.find((item) => item.key === target.group);
      setSelectedGroup(group);
      setLevel(group?.kind === 'events' || group?.kind === 'testimonials' ? 'items' : 'edit');
    }
  }, [admin.editorTarget]);

  useEffect(() => {
    if (!selectedGroup || !['events', 'testimonials'].includes(selectedGroup.kind)) return;
    api(`/api/admin/${selectedGroup.kind}`).then(setItems).catch(() => setItems([]));
  }, [selectedGroup]);

  if (!admin.rightOpen) return null;

  const close = () => {
    if (document.querySelector('[data-dirty="true"]') && !window.confirm('Discard unsaved changes?')) return;
    admin.closeEditor();
  };

  const saveContent = async (data) => {
    if (selectedGroup.kind === 'settings') await api('/api/admin/settings', { method: 'PATCH', body: JSON.stringify(data) });
    else await api(`/api/admin/content/${selectedGroup.key}`, { method: 'PATCH', body: JSON.stringify({ data }) });
    await admin.refreshContent();
  };

  const saveItem = async (item) => {
    const path = `/api/admin/${selectedGroup.kind}${item.id ? `/${item.id}` : ''}`;
    await api(path, { method: item.id ? 'PATCH' : 'POST', body: JSON.stringify(item) });
    setItems(await api(`/api/admin/${selectedGroup.kind}`));
    await admin.refreshContent();
    setLevel('items');
  };

  const currentValue = selectedGroup?.kind === 'settings'
    ? admin.content.settings
    : admin.content.blocks?.[selectedGroup?.key];

  return (
    <aside className="fixed right-0 top-0 z-[90] h-screen w-full max-w-xl bg-dark-surface text-white border-l border-white/10 shadow-2xl overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-dark-surface/95 px-5 py-4">
        <button type="button" onClick={() => (level === 'menu' ? close() : setLevel('menu'))} className="text-white/70 hover:text-white">
          {level === 'menu' ? 'Close' : 'Back'}
        </button>
        <Typography variant="eyebrow" className="text-brand-aqua-light">Editor</Typography>
      </div>
      <div className="p-5">
        {level === 'menu' && (
          <div className="space-y-3">
            {editableGroups.map((group) => (
              <button
                key={group.key}
                type="button"
                onClick={() => {
                  setSelectedGroup(group);
                  setLevel(group.kind === 'events' || group.kind === 'testimonials' ? 'items' : 'edit');
                }}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:border-brand-aqua/50"
              >
                {group.label}
              </button>
            ))}
          </div>
        )}
        {level === 'items' && selectedGroup && (
          <div className="space-y-3">
            <Button type="button" variant="cta" onClick={() => setLevel('new')}>
              Add {selectedGroup.label.slice(0, -1)}
            </Button>
            {items.map((item) => (
              <button key={item.id} type="button" onClick={() => { setSelectedGroup({ ...selectedGroup, item }); setLevel('itemEdit'); }} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left hover:border-brand-aqua/50">
                <span className="block font-semibold">{item.title || item.author}</span>
                <span className="block text-sm text-white/50">{item.date || item.role}</span>
              </button>
            ))}
          </div>
        )}
        {level === 'edit' && selectedGroup && (
          <JsonEditor title={selectedGroup.label} value={currentValue} onSave={saveContent} />
        )}
        {level === 'itemEdit' && selectedGroup?.item && (
          <ItemEditor kind={selectedGroup.kind} item={selectedGroup.item} onSave={saveItem} />
        )}
        {level === 'new' && selectedGroup && (
          <ItemEditor kind={selectedGroup.kind} item={{ active: true, sortOrder: items.length }} onSave={saveItem} />
        )}
      </div>
    </aside>
  );
}

function MediaDrawer() {
  const admin = useAdmin();
  const [media, setMedia] = useState([]);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      setMedia(await api('/api/admin/media'));
    } catch (err) {
      setMedia([]);
      setError(err.message);
      if (err.status === 401) admin.setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin.leftOpen) load();
  }, [admin.leftOpen]);

  if (!admin.leftOpen) return null;

  const upload = async (files) => {
    const imageFiles = Array.from(files || []).filter((file) => file.type.startsWith('image/'));
    if (!imageFiles.length) return;
    const form = new FormData();
    imageFiles.forEach((file) => form.append('images', file));
    setBusy(true);
    setError('');
    try {
      await api('/api/admin/media/batch', { method: 'POST', body: form });
      await load();
    } catch (err) {
      setError(err.message);
      if (err.status === 401) admin.setAuthenticated(false);
    } finally {
      setBusy(false);
    }
  };

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.type === 'dragenter' || event.type === 'dragover') setDragActive(true);
    if (event.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragActive(false);
    upload(event.dataTransfer.files);
  };

  const select = async (asset) => {
    if (admin.mediaTarget?.blockKey && admin.mediaTarget?.path) {
      await api(`/api/admin/content/${admin.mediaTarget.blockKey}/image`, {
        method: 'POST',
        body: JSON.stringify({ path: admin.mediaTarget.path, mediaId: asset.id }),
      });
      await admin.refreshContent();
      admin.closeMedia();
    }
  };

  return (
    <aside
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`fixed left-0 top-0 z-[90] h-screen w-full max-w-md bg-dark-surface text-white border-r shadow-2xl overflow-y-auto transition-colors ${
        dragActive ? 'border-brand-aqua bg-brand-aqua/10' : 'border-white/10'
      }`}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-dark-surface/95 px-5 py-4">
        <Typography variant="eyebrow" className="text-brand-sage-light">Library</Typography>
        <button type="button" onClick={admin.closeMedia} className="text-white/70 hover:text-white">Close</button>
      </div>
      <div className="p-5 space-y-5">
        <label className="flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-brand-aqua/50 bg-white/5 p-6 text-center hover:bg-white/10">
          <Icon name="upload" size={28} className="mb-2 text-brand-aqua-light" />
          <span>{busy ? 'Uploading...' : 'Drag or select images'}</span>
          <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => upload(e.target.files)} />
        </label>
        {error && (
          <div className="rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}
        <div className="flex items-center justify-between">
          <Typography variant="eyebrow" className="text-white/60">
            Stored Images
          </Typography>
          <span className="text-xs text-white/45">{media.length} total</span>
        </div>
        {loading && <Typography variant="small" className="text-white/60">Loading library...</Typography>}
        {!loading && !error && media.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-6 text-center text-sm text-white/60">
            No images are stored yet.
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
          {media.map((asset) => (
            <button key={asset.id} type="button" onClick={() => select(asset)} className="group overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left">
              <img src={asset.url} alt={asset.alt || asset.filename} className="aspect-square w-full object-cover group-hover:scale-105 transition-transform" />
              <span className="block truncate px-2 py-2 text-xs text-white/70">{asset.filename}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default function AdminOverlay() {
  const admin = useAdmin();

  useEffect(() => {
    if (!admin.enabled) return;
    api('/api/auth/session')
      .then((session) => admin.setAuthenticated(Boolean(session.authenticated)))
      .catch(() => admin.setAuthenticated(false));
  }, [admin.enabled]);

  if (!admin.enabled) return null;
  if (!admin.authenticated) return <AuthPanel />;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-[80] flex gap-2">
        <button type="button" onClick={() => admin.openMedia(null)} className="h-12 w-12 rounded-full bg-brand-sage text-white shadow-xl flex items-center justify-center">
          <Icon name="folder" size={20} />
        </button>
        <button type="button" onClick={() => admin.openEditor({ type: 'menu' })} className="h-12 w-12 rounded-full bg-brand-aqua text-white shadow-xl flex items-center justify-center">
          <Icon name="pencil" size={20} />
        </button>
      </div>
      <MediaDrawer />
      <RightDrawer />
    </>
  );
}
