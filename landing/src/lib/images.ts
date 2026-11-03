import type { ImageMetadata } from 'astro';

// Every photo in src/assets/images, keyed by its path relative to that folder
// (e.g. "hero/hero-patient.png"). Astro optimizes these at build time.
const photos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
});

/** Returns the optimizable image for a path like "faq/faq-couple.png", or undefined if the file is missing. */
export function getPhoto(path: string): ImageMetadata | undefined {
  return photos[`/src/assets/images/${path}`]?.default;
}
