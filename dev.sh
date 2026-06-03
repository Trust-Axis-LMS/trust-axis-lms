#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# Trust Axis — Dev / Production Launcher
# ─────────────────────────────────────────────────────────────────────────────

# Explicitly limit Node.js heap per process.
# Two Next.js dev servers at 4GB each can put heavy pressure on macOS memory.
# Override only when needed: NODE_MAX_OLD_SPACE_SIZE=3072 ./dev.sh
export NODE_OPTIONS="--max-old-space-size=${NODE_MAX_OLD_SPACE_SIZE:-2048}"
export NEXT_TELEMETRY_DISABLED=1

echo "🧹 Checking for orphaned Next.js dev servers..."
# Kill any orphaned node processes running next dev from previous corrupted runs
pkill -f "next dev" || true
pkill -f "next start" || true

# Clearing Next.js telemetry and compiler cache prevents compounding memory issues
echo "🧹 Clearing Next.js compilation caches..."
rm -rf frontend/.next
rm -rf courses-page/.next

MODE="${1:-development}"

case "$MODE" in
  development|dev)
    echo ""
    echo "  ╔══════════════════════════════════════════╗"
    echo "  ║   Trust Axis — DEVELOPMENT MODE          ║"
    echo "  ║   Landing  →  http://localhost:3000      ║"
    echo "  ║   Courses  →  http://localhost:3001      ║"
    echo "  ╚══════════════════════════════════════════╝"
    echo ""
    export APP_ENV=development
    # concurrently --kill-others is now configured in package.json
    npm run dev
    ;;

  production|prod)
    echo ""
    echo "  ╔══════════════════════════════════════════╗"
    echo "  ║   Trust Axis — PRODUCTION MODE (local)   ║"
    echo "  ║   Builds first, then starts both apps.   ║"
    echo "  ║   Landing  →  http://localhost:3000      ║"
    echo "  ║   Courses  →  http://localhost:3001      ║"
    echo "  ╚══════════════════════════════════════════╝"
    echo ""
    export APP_ENV=production
    echo "⚙  Building frontend..."
    npm run build --prefix frontend
    echo "⚙  Building courses-page..."
    npm run build --prefix courses-page
    echo "🚀 Starting both apps..."
    npm run start
    ;;

  *)
    echo "Usage: ./dev.sh [development|production]"
    exit 1
    ;;
esac
