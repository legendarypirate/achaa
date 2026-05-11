/** Used when news/hero images fail to load */
export const NEWS_IMAGE_FALLBACK =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80";

/**
 * 1×1 transparent GIF. Use as the final img `src` after fallbacks so the image
 * “succeeds” and `onerror` does not fire again — stops retry / request storms when
 * external CDNs (Unsplash, Wikimedia, etc.) are blocked in production.
 */
export const TRANSPARENT_PIXEL_GIF =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
