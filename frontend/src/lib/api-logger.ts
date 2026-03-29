/**
 * api-logger.ts — API timing logger (dev-only)
 *
 * Usage:
 *   import { timedFetch, getApiLog, clearApiLog } from "@/lib/api-logger";
 *
 *   const res = await timedFetch("Get Courses", "/api/courses");
 *   const res = await timedFetch("Post Enroll", "/api/enroll", { method: "POST", body: ... });
 *
 * View the log:
 *   GET http://localhost:3000/api/dev/api-log
 */

export interface ApiLogEntry {
  name: string;
  url: string;
  method: string;
  status: number | null;   // null if request threw
  durationMs: number;
  timestamp: string;       // ISO 8601
  ok: boolean;
  error?: string;          // set if request threw
}

// In-memory store — lives for the lifetime of the Node.js process (dev server)
const log: ApiLogEntry[] = [];

/**
 * Wraps fetch(), records timing + status for every call.
 * In production (NODE_ENV === "production") it transparently calls fetch() with zero overhead.
 */
export async function timedFetch(
  name: string,
  url: string,
  options?: RequestInit
): Promise<Response> {
  if (process.env.NODE_ENV === "production") {
    return fetch(url, options);
  }

  const method = (options?.method ?? "GET").toUpperCase();
  const start = performance.now();
  const timestamp = new Date().toISOString();

  try {
    const response = await fetch(url, options);
    const durationMs = Math.round(performance.now() - start);

    const entry: ApiLogEntry = {
      name,
      url,
      method,
      status: response.status,
      durationMs,
      timestamp,
      ok: response.ok,
    };

    log.push(entry);
    console.log(
      `[API] ${method} ${name} → ${response.status} — ${durationMs}ms`
    );

    return response;
  } catch (err) {
    const durationMs = Math.round(performance.now() - start);
    const errorMessage = err instanceof Error ? err.message : String(err);

    const entry: ApiLogEntry = {
      name,
      url,
      method,
      status: null,
      durationMs,
      timestamp,
      ok: false,
      error: errorMessage,
    };

    log.push(entry);
    console.error(
      `[API] ${method} ${name} → ERROR — ${durationMs}ms — ${errorMessage}`
    );

    throw err;
  }
}

/** Returns a copy of all recorded log entries. */
export function getApiLog(): ApiLogEntry[] {
  return [...log];
}

/** Clears the in-memory log. */
export function clearApiLog(): void {
  log.length = 0;
}
