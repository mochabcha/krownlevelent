import defaultSiteContent from '../../../shared/defaultSiteContent.json' with { type: 'json' };
import { ContentBlock, Event, MediaAsset, SiteSettings, Testimonial } from '../models/index.js';
import { isDatabaseConnected } from '../db/connect.js';
import { HttpError } from '../utils/http.js';
import { eventSchema, settingsSchema, testimonialSchema } from '../schemas/siteSchemas.js';

function labelFromKey(key: string) {
  return key
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function normalizeDoc(doc: any) {
  if (!doc) return doc;
  const item = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  return { ...item, id: String(item._id), _id: undefined, __v: undefined };
}

export async function seedDefaultContent() {
  if (!isDatabaseConnected()) return;

  const blockCount = await ContentBlock.estimatedDocumentCount();
  if (blockCount === 0) {
    await ContentBlock.insertMany(
      Object.entries(defaultSiteContent.blocks).map(([key, data]) => ({
        key,
        label: labelFromKey(key),
        data,
      }))
    );
  }

  if ((await Event.estimatedDocumentCount()) === 0) {
    await Event.insertMany(defaultSiteContent.events);
  }

  if ((await Testimonial.estimatedDocumentCount()) === 0) {
    await Testimonial.insertMany(defaultSiteContent.testimonials);
  }

  await SiteSettings.updateOne(
    { singletonKey: 'site' },
    { $setOnInsert: { singletonKey: 'site', ...defaultSiteContent.settings } },
    { upsert: true }
  );
}

export async function getSiteContent({ includeInactive = false } = {}) {
  if (!isDatabaseConnected()) return defaultSiteContent;

  await seedDefaultContent();

  const [blocks, settings, events, testimonials, media] = await Promise.all([
    ContentBlock.find().lean(),
    SiteSettings.findOne({ singletonKey: 'site' }).lean(),
    Event.find(includeInactive ? {} : { active: true }).sort({ sortOrder: 1, createdAt: 1 }).lean(),
    Testimonial.find(includeInactive ? {} : { active: true }).sort({ sortOrder: 1, createdAt: 1 }).lean(),
    MediaAsset.find(includeInactive ? {} : { archived: false }).sort({ createdAt: -1 }).lean(),
  ]);

  return {
    meta: defaultSiteContent.meta,
    settings: settings ? normalizeDoc(settings) : defaultSiteContent.settings,
    blocks: Object.fromEntries(blocks.map((block) => [block.key, block.data])),
    events: events.map(normalizeDoc),
    testimonials: testimonials.map(normalizeDoc),
    media: media.map(normalizeDoc),
  };
}

export async function listContentBlocks() {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for admin content');
  await seedDefaultContent();
  return ContentBlock.find().sort({ key: 1 }).lean().then((items) => items.map(normalizeDoc));
}

export async function updateContentBlock(key: string, data: Record<string, unknown>) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for admin content');
  const block = await ContentBlock.findOneAndUpdate(
    { key },
    { $set: { data, label: labelFromKey(key) } },
    { new: true, upsert: true }
  );
  return normalizeDoc(block);
}

export async function updateContentBlockImage(key: string, path: string[], mediaId: string) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for admin content');
  const block = await ContentBlock.findOne({ key });
  if (!block) throw new HttpError(404, 'Content block not found');

  let cursor: any = block.data;
  for (const segment of path.slice(0, -1)) {
    cursor[segment] = cursor[segment] || {};
    cursor = cursor[segment];
  }
  cursor[path[path.length - 1]] = { ...(cursor[path[path.length - 1]] || {}), mediaId };
  block.markModified('data');
  await block.save();
  return normalizeDoc(block);
}

export async function listEvents(includeInactive = true) {
  if (!isDatabaseConnected()) return defaultSiteContent.events;
  return Event.find(includeInactive ? {} : { active: true })
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean()
    .then((items) => items.map(normalizeDoc));
}

export async function createEvent(input: unknown) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for events');
  const event = await Event.create(eventSchema.parse(input));
  return normalizeDoc(event);
}

export async function updateEvent(id: string, input: unknown) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for events');
  const event = await Event.findByIdAndUpdate(id, { $set: eventSchema.partial().parse(input) }, { new: true });
  if (!event) throw new HttpError(404, 'Event not found');
  return normalizeDoc(event);
}

export async function listTestimonials(includeInactive = true) {
  if (!isDatabaseConnected()) return defaultSiteContent.testimonials;
  return Testimonial.find(includeInactive ? {} : { active: true })
    .sort({ sortOrder: 1, createdAt: 1 })
    .lean()
    .then((items) => items.map(normalizeDoc));
}

export async function createTestimonial(input: unknown) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for testimonials');
  const testimonial = await Testimonial.create(testimonialSchema.parse(input));
  return normalizeDoc(testimonial);
}

export async function updateTestimonial(id: string, input: unknown) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for testimonials');
  const testimonial = await Testimonial.findByIdAndUpdate(
    id,
    { $set: testimonialSchema.partial().parse(input) },
    { new: true }
  );
  if (!testimonial) throw new HttpError(404, 'Testimonial not found');
  return normalizeDoc(testimonial);
}

export async function getSettings() {
  if (!isDatabaseConnected()) return defaultSiteContent.settings;
  await seedDefaultContent();
  const settings = await SiteSettings.findOne({ singletonKey: 'site' }).lean();
  return normalizeDoc(settings);
}

export async function updateSettings(input: unknown) {
  if (!isDatabaseConnected()) throw new HttpError(503, 'MongoDB is required for settings');
  const settings = await SiteSettings.findOneAndUpdate(
    { singletonKey: 'site' },
    { $set: settingsSchema.partial().parse(input) },
    { new: true, upsert: true }
  );
  return normalizeDoc(settings);
}
