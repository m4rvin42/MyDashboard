#!/usr/bin/env bash
#
# mykiosk.sh – launch Chromium in kiosk mode on Raspberry Pi 4/5
#
# Usage:
#   ./mykiosk.sh https://example.com
#
# Works on:
#   • Raspberry Pi OS Bullseye (X11)
#   • Raspberry Pi OS Bookworm Wayland, both Wayfire and labwc
#

set -euo pipefail

# ---------- parameters ----------
URL=${1:-}
if [[ -z $URL ]]; then
  echo "Usage: $0 <url>"
  exit 1
fi

# ---------- wait until a display server is running ----------
until pgrep -x Xorg   >/dev/null 2>&1 || \
      pgrep -x X      >/dev/null 2>&1 || \
      pgrep -x wayfire>/dev/null 2>&1 || \
      pgrep -x labwc  >/dev/null 2>&1; do
  sleep 0.5
done

# ---------- optional niceties ----------
# hide cursor after 1 s of inactivity
command -v unclutter >/dev/null 2>&1 && unclutter --fork --timeout 1 &

# disable DPMS / screen blanking (X11 only – harmless on Wayland)
xset -dpms   2>/dev/null || true
xset s off   2>/dev/null || true
xset s noblank 2>/dev/null || true

# ---------- find Chromium ----------
BROWSER=$(command -v chromium || command -v chromium-browser || true)
if [[ -z $BROWSER ]]; then
  echo "Chromium not found.  Install it with:"
  echo "  sudo apt install chromium        # Bookworm"
  echo "  sudo apt install chromium-browser# Bullseye"
  exit 1
fi

# ---------- launch ----------
exec "$BROWSER" \
  --kiosk "$URL" \
  --noerrdialogs \
  --incognito \
  --disable-features=TranslateUI \
  --disable-translate \
  --overscroll-history-navigation=0 \
  --disable-pinch
