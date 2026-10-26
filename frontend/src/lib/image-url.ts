/**
 * Adds Cloudinary auto-format / auto-quality / max-width transforms to an
 * image delivery URL. Non-Cloudinary URLs (and URLs that already carry
 * transforms) are returned unchanged.
 */
export function optimizeImageUrl(url: string, width = 1600): string {
  const marker = "/image/upload/";
  if (!url.includes("res.cloudinary.com") || !url.includes(marker)) return url;

  const [base, rest] = url.split(marker);
  // Already transformed (e.g. "f_auto,q_auto/..." or "w_800/...")
  if (/^[a-z]{1,3}_[^/]+\//.test(rest)) return url;

  return `${base}${marker}f_auto,q_auto,c_limit,w_${width}/${rest}`;
}
