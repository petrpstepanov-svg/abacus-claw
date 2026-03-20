/* ─── UTM Parameter Utilities ─── */

interface UtmParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

/**
 * Extract UTM parameters from a URL search string.
 * Works both on client (window.location.search) and with any query string.
 */
function extractUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const result: UtmParams = {};

  const source = params.get('utm_source');
  const medium = params.get('utm_medium');
  const campaign = params.get('utm_campaign');

  if (source) result.utm_source = source;
  if (medium) result.utm_medium = medium;
  if (campaign) result.utm_campaign = campaign;

  return result;
}

/**
 * Get UTM params from the current browser URL.
 * Safe to call on both client and server (returns empty on server).
 */
function getUtmFromUrl(): UtmParams {
  if (typeof window === 'undefined') return {};
  return extractUtmParams(window.location.search);
}

export { extractUtmParams, getUtmFromUrl };
export type { UtmParams };
