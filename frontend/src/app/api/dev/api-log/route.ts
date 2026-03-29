import { NextResponse } from "next/server";
import { getApiLog, clearApiLog } from "@/lib/api-logger";

/**
 * GET /api/dev/api-log
 * Returns all recorded API timing entries as JSON.
 * Only available in development — returns 404 in production.
 */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);

  // ?clear=1 clears the log after responding
  const shouldClear = searchParams.get("clear") === "1";
  const entries = getApiLog();

  const summary = {
    totalRequests: entries.length,
    averageDurationMs:
      entries.length > 0
        ? Math.round(entries.reduce((sum, e) => sum + e.durationMs, 0) / entries.length)
        : 0,
    slowest: entries.length > 0 ? Math.max(...entries.map((e) => e.durationMs)) : 0,
    fastest: entries.length > 0 ? Math.min(...entries.map((e) => e.durationMs)) : 0,
    errorCount: entries.filter((e) => !e.ok).length,
  };

  if (shouldClear) {
    clearApiLog();
  }

  return NextResponse.json(
    {
      summary,
      entries,
      clearedAfterResponse: shouldClear,
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    }
  );
}
