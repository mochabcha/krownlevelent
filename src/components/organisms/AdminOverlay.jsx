import { useEffect, useMemo, useState } from 'react';
import { Button, Icon, Input, Textarea, Typography } from '../atoms';
import { useAdmin } from '../admin/AdminContext';
import { resolveImage } from '../../content/imageRegistry';

const editableGroups = [
  { key: 'general', label: 'General Settings', kind: 'settings', section: 'Site Settings' },
  { key: 'events', label: 'Events', kind: 'events', section: 'CMS Collections' },
  { key: 'testimonials', label: 'Testimonials', kind: 'testimonials', section: 'CMS Collections' },
  { key: 'hero', label: 'Hero', kind: 'content', section: 'Page Components' },
  { key: 'brand-ecosystem', label: 'KLE Focus Points', kind: 'content', section: 'Page Components' },
  { key: 'founder-bio', label: 'Founder Bio', kind: 'content', section: 'Page Components' },
  { key: 'credentials', label: 'Credentials', kind: 'content', section: 'Page Components' },
  { key: 'quote-banner', label: 'Quote Banner', kind: 'content', section: 'Page Components' },
  { key: 'vision', label: 'Vision', kind: 'content', section: 'Page Components' },
  { key: 'wellness', label: "Genie's Healing Elements", kind: 'content', section: 'Page Components' },
  { key: 'plant-klub', label: 'Plant Klub', kind: 'content', section: 'Page Components' },
  { key: 'sage-defense', label: 'SAGE Defense Systems', kind: 'content', section: 'Page Components' },
  { key: 'sign-up', label: 'Signup Form Copy', kind: 'content', section: 'Page Components' },
  { key: 'contact', label: 'Contact Copy', kind: 'content', section: 'Page Components' },
  { key: 'secondary-cta', label: 'Secondary CTA', kind: 'content', section: 'Page Components' },
  { key: 'footer', label: 'Footer', kind: 'content', section: 'Page Components' },
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

function cloneValue(value) {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

function labelFromKey(key) {
  return String(key)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getPathValue(source, path = []) {
  return path.reduce((cursor, segment) => cursor?.[segment], source);
}

function updatePathValue(source, path, value) {
  if (!path.length) return value;
  const [head, ...rest] = path;
  const next = Array.isArray(source) ? [...source] : { ...(source || {}) };
  next[head] = updatePathValue(next[head], rest, value);
  return next;
}

function isImageRef(value) {
  return value && typeof value === 'object' && !Array.isArray(value) && ('assetKey' in value || 'mediaId' in value || 'url' in value) && 'alt' in value;
}

function groupedEditableItems() {
  return editableGroups.reduce((groups, item) => {
    const section = item.section || 'Content';
    groups[section] = groups[section] || [];
    groups[section].push(item);
    return groups;
  }, {});
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

function StructuredFields({ value, path = [], onChange, depth = 0 }) {
  if (Array.isArray(value)) {
    const isPrimitiveList = value.every((item) => item === null || typeof item !== 'object');
    return (
      <div className="divide-y divide-white/10">
        {value.map((item, index) => (
          <div key={`${path.join('.')}.${index}`} className="py-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <Typography variant="eyebrow" className="text-white/45">
                {isPrimitiveList ? `Item ${index + 1}` : `${labelFromKey(path[path.length - 1] || 'Item')} ${index + 1}`}
              </Typography>
              <button
                type="button"
                onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                className="text-xs text-red-200 hover:text-red-100"
              >
                Remove
              </button>
            </div>
            {isPrimitiveList ? (
              <Input
                value={item || ''}
                onChange={(event) => onChange([...path, index], event.target.value)}
                className="bg-white/5 text-white border-white/15"
              />
            ) : (
              <StructuredFields value={item || {}} path={[...path, index]} onChange={onChange} depth={depth + 1} />
            )}
          </div>
        ))}
        <div className="py-4">
          <button
            type="button"
            onClick={() => onChange(path, [...value, isPrimitiveList ? '' : {}])}
            className="text-sm text-brand-aqua-light hover:text-white"
          >
            Add {labelFromKey(path[path.length - 1] || 'item')}
          </button>
        </div>
      </div>
    );
  }

  if (value && typeof value === 'object') {
    if (isImageRef(value)) {
      return (
        <div className="space-y-2">
          <Input
            value={value.alt || ''}
            onChange={(event) => onChange([...path, 'alt'], event.target.value)}
            placeholder="Alt text"
            className="bg-white/5 text-white border-white/15"
          />
          <Typography variant="small" className="text-white/40">
            Image file changes happen from the image library.
          </Typography>
        </div>
      );
    }

    return (
      <div className={depth === 0 ? 'divide-y divide-white/10' : 'space-y-4'}>
        {Object.entries(value).map(([key, item]) => {
          const fieldPath = [...path, key];
          if (key === 'id' || key === '_id' || key === '__v' || key === 'singletonKey') return null;

          if (isImageRef(item)) {
            return (
              <div key={fieldPath.join('.')} className={depth === 0 ? 'py-4' : ''}>
                <Typography variant="eyebrow" className="mb-2 text-white/45">
                  {labelFromKey(key)}
                </Typography>
                <Input
                  value={item.alt || ''}
                  onChange={(event) => onChange([...fieldPath, 'alt'], event.target.value)}
                  placeholder="Alt text"
                  className="bg-white/5 text-white border-white/15"
                />
                <Typography variant="small" className="mt-2 text-white/40">
                  Image file changes happen from the image library.
                </Typography>
              </div>
            );
          }

          if (Array.isArray(item) || (item && typeof item === 'object')) {
            return (
              <div key={fieldPath.join('.')} className={depth === 0 ? 'py-5' : 'border-l border-white/10 pl-4'}>
                <Typography variant="eyebrow" className="mb-3 text-brand-aqua-light">
                  {labelFromKey(key)}
                </Typography>
                <StructuredFields value={item} path={fieldPath} onChange={onChange} depth={depth + 1} />
              </div>
            );
          }

          if (typeof item === 'boolean') {
            return (
              <label key={fieldPath.join('.')} className={`flex items-center justify-between gap-4 ${depth === 0 ? 'py-4' : ''}`}>
                <span className="text-sm text-white/75">{labelFromKey(key)}</span>
                <input type="checkbox" checked={item} onChange={(event) => onChange(fieldPath, event.target.checked)} />
              </label>
            );
          }

          const stringValue = item ?? '';
          const isLong = String(stringValue).length > 90 || ['lead', 'description', 'content', 'quote', 'philosophy', 'tagline', 'creditTagline'].includes(key);
          return (
            <label key={fieldPath.join('.')} className={`block ${depth === 0 ? 'py-4' : ''}`}>
              <span className="mb-2 block text-sm text-white/65">{labelFromKey(key)}</span>
              {isLong ? (
                <Textarea
                  rows={4}
                  value={stringValue}
                  onChange={(event) => onChange(fieldPath, event.target.value)}
                  className="bg-white/5 text-white border-white/15"
                />
              ) : (
                <Input
                  type={typeof item === 'number' ? 'number' : 'text'}
                  value={stringValue}
                  onChange={(event) => onChange(fieldPath, typeof item === 'number' ? Number(event.target.value) : event.target.value)}
                  className="bg-white/5 text-white border-white/15"
                />
              )}
            </label>
          );
        })}
      </div>
    );
  }

  return null;
}

function FieldEditor({ title, value, onSave }) {
  const [draft, setDraft] = useState(() => cloneValue(value || {}));
  const [dirty, setDirty] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setDraft(cloneValue(value || {}));
    setDirty(false);
    setError('');
  }, [value]);

  const update = (path, nextValue) => {
    setDraft((current) => updatePathValue(current, path, nextValue));
    setDirty(true);
  };

  const save = async () => {
    setError('');
    try {
      await onSave(draft);
      setDirty(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-4" data-dirty={dirty ? 'true' : undefined}>
      <Typography variant="h4" className="text-white">{title}</Typography>
      <StructuredFields value={draft} onChange={update} />
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
    <div className="space-y-4" data-dirty={dirty ? 'true' : undefined}>
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
  const menuGroups = useMemo(groupedEditableItems, []);

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
          <div className="space-y-8">
            {Object.entries(menuGroups).map(([section, groups]) => (
              <div key={section}>
                <Typography variant="eyebrow" className="mb-2 text-brand-aqua-light">
                  {section}
                </Typography>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {groups.map((group) => (
                    <button
                      key={group.key}
                      type="button"
                      onClick={() => {
                        setSelectedGroup(group);
                        setLevel(group.kind === 'events' || group.kind === 'testimonials' ? 'items' : 'edit');
                      }}
                      className="flex w-full items-center justify-between px-1 py-4 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span>{group.label}</span>
                      <Icon name="chevron-right" size={16} className="text-white/35" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {level === 'items' && selectedGroup && (
          <div className="space-y-4">
            <Button type="button" variant="cta" onClick={() => setLevel('new')}>
              Add {selectedGroup.label.slice(0, -1)}
            </Button>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {items.map((item) => (
                <button key={item.id} type="button" onClick={() => { setSelectedGroup({ ...selectedGroup, item }); setLevel('itemEdit'); }} className="flex w-full items-center justify-between px-1 py-4 text-left transition-colors hover:bg-white/[0.04]">
                  <span>
                    <span className="block font-semibold">{item.title || item.author}</span>
                    <span className="block text-sm text-white/50">{item.date || item.role}</span>
                  </span>
                  <Icon name="chevron-right" size={16} className="text-white/35" />
                </button>
              ))}
            </div>
          </div>
        )}
        {level === 'edit' && selectedGroup && (
          <FieldEditor title={selectedGroup.label} value={currentValue} onSave={saveContent} />
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
  const [currentAlt, setCurrentAlt] = useState('');
  const [assetAltDrafts, setAssetAltDrafts] = useState({});

  const currentImageRef = admin.mediaTarget?.blockKey
    ? getPathValue(admin.content.blocks?.[admin.mediaTarget.blockKey], admin.mediaTarget.path)
    : null;
  const currentImage = currentImageRef ? resolveImage(currentImageRef, admin.mediaById) : null;
  const currentBlock = admin.mediaTarget?.blockKey ? admin.content.blocks?.[admin.mediaTarget.blockKey] : null;

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const items = await api('/api/admin/media');
      setMedia(items);
      setAssetAltDrafts(Object.fromEntries(items.map((asset) => [asset.id, asset.alt || ''])));
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

  useEffect(() => {
    setCurrentAlt(currentImageRef?.alt || '');
  }, [admin.leftOpen, admin.mediaTarget, currentImageRef?.alt]);

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
        body: JSON.stringify({ path: admin.mediaTarget.path, mediaId: asset.id, alt: currentAlt }),
      });
      await admin.refreshContent();
      admin.closeMedia();
    }
  };

  const saveCurrentAlt = async () => {
    if (!admin.mediaTarget?.blockKey || !currentBlock || !currentImageRef) return;
    setError('');
    try {
      const nextBlock = updatePathValue(currentBlock, admin.mediaTarget.path, { ...currentImageRef, alt: currentAlt });
      await api(`/api/admin/content/${admin.mediaTarget.blockKey}`, {
        method: 'PATCH',
        body: JSON.stringify({ data: nextBlock }),
      });
      await admin.refreshContent();
    } catch (err) {
      setError(err.message);
      if (err.status === 401) admin.setAuthenticated(false);
    }
  };

  const saveAssetAlt = async (asset) => {
    const nextAlt = assetAltDrafts[asset.id] || '';
    if (nextAlt === (asset.alt || '')) return;
    setError('');
    try {
      const updated = await api(`/api/admin/media/${asset.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ alt: nextAlt }),
      });
      setMedia((items) => items.map((item) => (item.id === updated.id ? updated : item)));
      await admin.refreshContent();
    } catch (err) {
      setError(err.message);
      if (err.status === 401) admin.setAuthenticated(false);
    }
  };

  const formatBytes = (size) => {
    if (!size) return '';
    if (size < 1024 * 1024) return `${Math.round(size / 1024)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
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
        {currentImage && (
          <div className="border-b border-white/10 pb-5">
            <Typography variant="eyebrow" className="mb-3 text-brand-aqua-light">
              Current Image
            </Typography>
            <div className="grid grid-cols-[112px_1fr] gap-4">
              <img src={currentImage.src} alt={currentImage.alt || ''} className="aspect-square w-28 object-cover" />
              <div className="min-w-0 space-y-3">
                <div>
                  <span className="block text-sm text-white/80">{currentImage.filename || currentImage.assetKey || 'Selected image'}</span>
                  {currentImage.mediaId && <span className="block truncate text-xs text-white/40">Media ID: {currentImage.mediaId}</span>}
                </div>
                <label className="block">
                  <span className="mb-1 block text-xs text-white/50">Alt text for this placement</span>
                  <Input
                    value={currentAlt}
                    onChange={(event) => setCurrentAlt(event.target.value)}
                    onBlur={saveCurrentAlt}
                    className="bg-white/5 text-white border-white/15"
                  />
                </label>
                <button type="button" onClick={saveCurrentAlt} className="text-sm text-brand-aqua-light hover:text-white">
                  Save alt text
                </button>
              </div>
            </div>
          </div>
        )}
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
        <div className="divide-y divide-white/10 border-y border-white/10">
          {media.map((asset) => (
            <div key={asset.id} className="grid grid-cols-[84px_1fr] gap-3 py-4 transition-colors hover:bg-white/[0.04]">
              <img src={asset.url} alt={asset.alt || asset.filename} className="aspect-square w-[84px] object-cover" />
              <div className="min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <span className="block truncate text-sm text-white/80">{asset.filename}</span>
                    <span className="block text-xs text-white/40">
                      {[asset.width && asset.height ? `${asset.width}x${asset.height}` : '', formatBytes(asset.size)].filter(Boolean).join(' · ')}
                    </span>
                  </div>
                  {admin.mediaTarget && (
                    <button type="button" onClick={() => select(asset)} className="shrink-0 text-sm text-brand-aqua-light hover:text-white">
                      Use
                    </button>
                  )}
                </div>
                <label className="block">
                  <span className="mb-1 block text-xs text-white/45">Library alt text</span>
                  <Input
                    value={assetAltDrafts[asset.id] || ''}
                    onChange={(event) => setAssetAltDrafts((drafts) => ({ ...drafts, [asset.id]: event.target.value }))}
                    onBlur={() => saveAssetAlt(asset)}
                    className="bg-white/5 text-white border-white/15"
                  />
                </label>
              </div>
            </div>
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
