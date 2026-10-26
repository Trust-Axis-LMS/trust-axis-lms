// ─── Site lock ────────────────────────────────────────────────────────────────
// Shared by both apps (trustacg.com and train.trustacg.com) via their proxy.ts.
// Set SITE_LOCKED to false to restore both sites.
export const SITE_LOCKED = false;

const LOCKED_HTML = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>Site Access Locked</title><style>*{box-sizing:border-box;margin:0;padding:0}html,body{height:100%}body{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#B00020;color:#fff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;padding:24px;text-align:center}h1{font-size:clamp(28px,5vw,56px);font-weight:800;letter-spacing:-0.02em;line-height:1.15;max-width:900px}p{margin-top:20px;font-size:clamp(15px,2vw,20px);opacity:.85}</style></head><body><main><h1>Site access has been locked due to non-payment to the developer.</h1><p>This website is temporarily unavailable.</p></main></body></html>`;

export function siteLockedResponse(): Response {
  return new Response(LOCKED_HTML, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "86400",
    },
  });
}
