import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Icon, Input, Typography } from '../atoms';
import { iconNames } from '../atoms/Icon';
import { useAdmin } from '../admin/AdminContext';
import { resolveImage } from '../../content/imageRegistry';
import { normalizeRichText } from '../../utils/richText';

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

const sectionIdsByGroup = {
  hero: 'hero',
  'founder-bio': 'about',
  wellness: 'wellness',
  'plant-klub': 'plant-klub',
  'sage-defense': 'sage-defense',
  'sign-up': 'contact',
  events: 'events',
};

function findEditableElement(groupKey) {
  const editButton = document.querySelector(`[data-admin-group="${groupKey}"]`);
  if (editButton) return editButton.closest('section') || editButton.closest('[id]') || editButton;
  const id = sectionIdsByGroup[groupKey];
  return id ? document.getElementById(id) : null;
}

function highlightEditableGroup(groupKey) {
  if (!groupKey) return;
  const element = findEditableElement(groupKey);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const previousOutline = element.style.outline;
  const previousOffset = element.style.outlineOffset;
  const previousTransition = element.style.transition;
  element.style.transition = 'outline-color 180ms ease, outline-offset 180ms ease';
  element.style.outline = '3px solid rgba(68, 214, 197, 0.85)';
  element.style.outlineOffset = '-6px';
  window.setTimeout(() => {
    element.style.outline = previousOutline;
    element.style.outlineOffset = previousOffset;
    element.style.transition = previousTransition;
  }, 1800);
}

function AdminTextField({ label, value, onChange, type = 'text', multiline = false, rows = 3, helper = '', error = '', children }) {
  const fieldClass = `peer w-full rounded-md border border-white/15 bg-white/[0.035] px-3 pb-2 pt-5 text-sm text-white outline-none transition-colors placeholder:text-transparent focus:border-brand-aqua/70 focus:bg-white/[0.055] ${
    multiline ? 'resize-y' : 'h-11'
  }`;

  return (
    <label className="relative block">
      {multiline ? (
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={fieldClass}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={fieldClass}
        />
      )}
      <span className="pointer-events-none absolute left-3 top-1.5 text-[11px] uppercase tracking-wide text-white/45 transition-colors peer-focus:text-brand-aqua-light">
        {label}
      </span>
      {children}
      {(helper || error) && (
        <span className={`mt-1 block text-xs ${error ? 'text-red-200' : 'text-white/45'}`}>
          {error || helper}
        </span>
      )}
    </label>
  );
}

function IconSelector({ label, value, onChange }) {
  const [query, setQuery] = useState('');
  const filteredIcons = iconNames.filter((name) => name.includes(query.trim().toLowerCase()));

  return (
    <div className="space-y-2">
      <AdminTextField label={label} value={query} onChange={(event) => setQuery(event.target.value)} helper={`Selected: ${value || 'none'}`}>
        <Icon name="search" size={15} className="absolute right-3 top-4 text-white/35" />
      </AdminTextField>
      <div className="grid max-h-44 grid-cols-4 gap-1 overflow-y-auto border-l border-white/10 pl-3">
        {filteredIcons.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            className={`flex h-14 flex-col items-center justify-center gap-1 rounded-md text-[10px] transition-colors ${
              value === name ? 'bg-brand-aqua text-dark-bg' : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
            }`}
            title={name}
          >
            <Icon name={name} size={18} />
            <span className="max-w-full truncate px-1">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function RichTextField({ label, value, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== (value || '')) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const run = (command, input = null) => {
    document.execCommand(command, false, input);
    onChange(normalizeRichText(editorRef.current?.innerHTML || ''));
  };

  const toolbar = [
    { icon: 'bold', label: 'Bold', command: 'bold' },
    { icon: 'italic', label: 'Italic', command: 'italic' },
    { icon: 'list', label: 'Bullets', command: 'insertUnorderedList' },
    { icon: 'list-ordered', label: 'Numbers', command: 'insertOrderedList' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Typography variant="eyebrow" className="text-white/45">{label}</Typography>
        <div className="flex items-center gap-1">
          {toolbar.map((item) => (
            <button
              key={item.command}
              type="button"
              onClick={() => run(item.command)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
              title={item.label}
            >
              <Icon name={item.icon} size={15} />
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              const href = window.prompt('Link URL');
              if (href) run('createLink', href);
            }}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/70 hover:bg-white/[0.06] hover:text-white"
            title="Link"
          >
            <Icon name="link" size={15} />
          </button>
        </div>
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(event) => onChange(normalizeRichText(event.currentTarget.innerHTML))}
        onBlur={(event) => onChange(normalizeRichText(event.currentTarget.innerHTML))}
        className="min-h-28 rounded-md border border-white/15 bg-white/[0.035] px-3 py-3 text-sm leading-relaxed text-white outline-none focus:border-brand-aqua/70 focus:bg-white/[0.055] [&_a]:text-brand-aqua-light [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
      />
    </div>
  );
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
      <div className="border-l border-white/10 pl-4">
        {value.map((item, index) => (
          <div key={`${path.join('.')}.${index}`} className="py-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <Typography variant="eyebrow" className="text-white/45">
                {isPrimitiveList ? `Item ${index + 1}` : `${labelFromKey(path[path.length - 1] || 'Item')} ${index + 1}`}
              </Typography>
              <button
                type="button"
                onClick={() => onChange(path, value.filter((_, itemIndex) => itemIndex !== index))}
                className="inline-flex items-center gap-1 rounded-md border border-red-200/20 px-2 py-1 text-xs text-red-200 hover:bg-red-500/10 hover:text-red-100"
              >
                <Icon name="trash" size={13} />
                Remove
              </button>
            </div>
            {isPrimitiveList ? (
              <AdminTextField
                label={`Item ${index + 1}`}
                value={item || ''}
                onChange={(event) => onChange([...path, index], event.target.value)}
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
            className="inline-flex items-center gap-2 rounded-md border border-brand-aqua/30 px-3 py-2 text-sm text-brand-aqua-light hover:bg-brand-aqua/10 hover:text-white"
          >
            <Icon name="plus" size={15} />
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
          <AdminTextField
            label="Alt text"
            value={value.alt || ''}
            onChange={(event) => onChange([...path, 'alt'], event.target.value)}
            helper="Image file changes happen from the image library."
          />
        </div>
      );
    }

    return (
      <div className={depth === 0 ? 'space-y-5' : 'space-y-4'}>
        {Object.entries(value).map(([key, item]) => {
          const fieldPath = [...path, key];
          if (key === 'id' || key === '_id' || key === '__v' || key === 'singletonKey') return null;

          if (isImageRef(item)) {
            return (
              <div key={fieldPath.join('.')} className={depth === 0 ? 'py-4' : ''}>
                <Typography variant="eyebrow" className="mb-2 text-white/45">
                  {labelFromKey(key)}
                </Typography>
                <AdminTextField
                  label="Alt text"
                  value={item.alt || ''}
                  onChange={(event) => onChange([...fieldPath, 'alt'], event.target.value)}
                  helper="Image file changes happen from the image library."
                />
              </div>
            );
          }

          if (Array.isArray(item) || (item && typeof item === 'object')) {
            return (
              <div key={fieldPath.join('.')} className={depth === 0 ? 'border-t border-white/10 pt-5 first:border-t-0 first:pt-0' : 'border-l border-white/10 pl-4'}>
                <Typography variant="eyebrow" className="mb-3 text-brand-aqua-light">
                  {labelFromKey(key)}
                </Typography>
                <StructuredFields value={item} path={fieldPath} onChange={onChange} depth={depth + 1} />
              </div>
            );
          }

          if (typeof item === 'boolean') {
            return (
              <label key={fieldPath.join('.')} className="flex items-center justify-between gap-4 rounded-md px-1 py-2 hover:bg-white/[0.04]">
                <span className="text-sm text-white/75">{labelFromKey(key)}</span>
                <input type="checkbox" checked={item} onChange={(event) => onChange(fieldPath, event.target.checked)} />
              </label>
            );
          }

          const stringValue = item ?? '';
          const isLong = String(stringValue).length > 90 || ['lead', 'description', 'content', 'quote', 'philosophy', 'tagline', 'creditTagline'].includes(key);
          const isIcon = key === 'icon' || key.endsWith('Icon');

          if (isIcon) {
            return (
              <div key={fieldPath.join('.')} className="py-1">
                <IconSelector label={labelFromKey(key)} value={stringValue} onChange={(nextIcon) => onChange(fieldPath, nextIcon)} />
              </div>
            );
          }

          return (
            <div key={fieldPath.join('.')} className="py-1">
              {isLong ? (
                <RichTextField label={labelFromKey(key)} value={stringValue} onChange={(nextValue) => onChange(fieldPath, nextValue)} />
              ) : (
                <AdminTextField
                  label={labelFromKey(key)}
                  type={typeof item === 'number' ? 'number' : 'text'}
                  value={stringValue}
                  onChange={(event) => onChange(fieldPath, typeof item === 'number' ? Number(event.target.value) : event.target.value)}
                />
              )}
            </div>
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
          <RichTextField key={field} label={labelFromKey(field)} value={draft[field] || ''} onChange={(nextValue) => update(field, nextValue)} />
        ) : (
          <AdminTextField key={field} label={labelFromKey(field)} value={draft[field] || ''} onChange={(e) => update(field, e.target.value)} />
        )
      ))}
      <label className="flex items-center justify-between gap-4 rounded-md px-1 py-2 text-white/80 hover:bg-white/[0.04]">
        <span>Active</span>
        <input type="checkbox" checked={draft.active !== false} onChange={(e) => update('active', e.target.checked)} />
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
      highlightEditableGroup(target.group);
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
                        highlightEditableGroup(group.key);
                      }}
                      className="flex w-full items-center justify-between px-1 py-4 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <span>{group.label}</span>
                      <span className="inline-flex items-center gap-2 text-white/40">
                        <Icon name="pencil" size={14} />
                        <Icon name="chevron-right" size={16} />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        {level === 'items' && selectedGroup && (
          <div className="space-y-4">
            <Button type="button" variant="cta" onClick={() => setLevel('new')} className="rounded-md px-4 py-3 text-sm">
              <Icon name="plus" size={16} className="mr-2" />
              Add {selectedGroup.label.slice(0, -1)}
            </Button>
            <div className="divide-y divide-white/10 border-y border-white/10">
              {items.map((item) => (
                <button key={item.id} type="button" onClick={() => { setSelectedGroup({ ...selectedGroup, item }); setLevel('itemEdit'); }} className="flex w-full items-center justify-between px-1 py-4 text-left transition-colors hover:bg-white/[0.04]">
                  <span>
                    <span className="block font-semibold">{item.title || item.author}</span>
                    <span className="block text-sm text-white/50">{item.date || item.role}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 text-white/40">
                    <Icon name="pencil" size={14} />
                    <Icon name="chevron-right" size={16} />
                  </span>
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
