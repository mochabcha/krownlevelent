import defaultSiteContent from '../../shared/defaultSiteContent.json';

export function mergeSiteContent(remoteContent) {
  if (!remoteContent) return defaultSiteContent;

  return {
    ...defaultSiteContent,
    ...remoteContent,
    settings: {
      ...defaultSiteContent.settings,
      ...(remoteContent.settings || {}),
      contact: {
        ...defaultSiteContent.settings.contact,
        ...(remoteContent.settings?.contact || {}),
      },
      logos: {
        ...defaultSiteContent.settings.logos,
        ...(remoteContent.settings?.logos || {}),
      },
    },
    blocks: {
      ...defaultSiteContent.blocks,
      ...(remoteContent.blocks || {}),
    },
    events: remoteContent.events || defaultSiteContent.events,
    testimonials: remoteContent.testimonials || defaultSiteContent.testimonials,
    media: remoteContent.media || [],
  };
}

export { defaultSiteContent };
