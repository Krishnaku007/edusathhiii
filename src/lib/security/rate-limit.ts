const requests = new Map<string, number[]>();

export function checkRateLimit(
  key: string,
  options: { limit?: number; windowMs?: number } = {},
) {
  const limit = options.limit ?? 20;
  const windowMs = options.windowMs ?? 60_000;
  const now = Date.now();

  const existing = requests.get(key) ?? [];
  const valid = existing.filter((timestamp) => now - timestamp < windowMs);

  if (valid.length >= limit) {
    return {
      ok: false,
      retryAfter: Math.ceil((windowMs - (now - valid[0])) / 1000),
    };
  }

  valid.push(now);
  requests.set(key, valid);

  return { ok: true };
}
