/* ─── Rate Limiter (IP-based, in-memory) ─── */

interface RateLimitEntry {
  /** Timestamps of requests within the current window */
  timestamps: number[];
}

interface RateLimitConfig {
  /** Maximum requests allowed within the window */
  maxRequests: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000, // 15 minutes
};

/** In-memory store keyed by IP */
const store = new Map<string, RateLimitEntry>();

/** Periodic cleanup interval id */
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

/**
 * Remove stale entries that have no timestamps within the window.
 * Called automatically every `windowMs`.
 */
function pruneStore(windowMs: number): void {
  const now = Date.now();
  store.forEach((entry, ip) => {
    entry.timestamps = entry.timestamps.filter((t: number) => now - t < windowMs);
    if (entry.timestamps.length === 0) {
      store.delete(ip);
    }
  });
}

/**
 * Start background cleanup if not already running.
 */
function ensureCleanup(windowMs: number): void {
  if (cleanupTimer !== null) return;
  cleanupTimer = setInterval(() => pruneStore(windowMs), windowMs);
  // Allow Node.js to exit even if timer is pending
  if (typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    cleanupTimer.unref();
  }
}

/**
 * Check whether a request from `ip` is allowed.
 *
 * @returns `true` if the request is **allowed**, `false` if rate-limited.
 */
function checkRateLimit(
  ip: string,
  config: RateLimitConfig = DEFAULT_CONFIG,
): boolean {
  ensureCleanup(config.windowMs);

  const now = Date.now();
  const entry = store.get(ip);

  if (!entry) {
    store.set(ip, { timestamps: [now] });
    return true;
  }

  // Drop timestamps outside the current window
  entry.timestamps = entry.timestamps.filter(
    (t) => now - t < config.windowMs,
  );

  if (entry.timestamps.length >= config.maxRequests) {
    return false;
  }

  entry.timestamps.push(now);
  return true;
}

/** Reset the entire store (useful for testing). */
function resetRateLimit(): void {
  store.clear();
}

export { checkRateLimit, resetRateLimit };
export type { RateLimitConfig };
