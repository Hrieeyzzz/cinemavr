#!/bin/sh
# CinemaVR local launcher (macOS) — double-click me.
cd "$(dirname "$0")" || exit 1
PORT=8080
URL="http://localhost:$PORT/"
echo ""
echo "  CinemaVR is starting at $URL"
echo "  Keep this terminal open while watching. Close it to stop the server."
echo ""
sleep 1
open "$URL" >/dev/null 2>&1 &
if command -v python3 >/dev/null 2>&1; then exec python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then exec python -m http.server "$PORT"
else echo "Python is required to serve CinemaVR. Install python3, then re-run."; exit 1; fi
