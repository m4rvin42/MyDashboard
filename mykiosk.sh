#!/usr/bin/env bash
#
# kiosk.sh – launch Chromium in kiosk mode on Raspberry Pi 4
#
# Usage:
#   ./kiosk.sh https://your‑dashboard.local
#
# Drop it anywhere executable and, if you want it to run on every boot,
# call it from a systemd user unit or from LXDE’s autostart file:
#   ~/.config/lxsession/LXDE-pi/autostart
#   @/path/to/kiosk.sh https://…
#

set -euo pipefail

URL=${1:-}
if [[ -z $URL ]]; then
  echo "Usage: $0 <url>"
  exit 1
fi

#---------- wait until a graphical session is up (boot‑time safety) ----------
while ! pgrep -x wayland >/dev/null && ! pgrep -x Xorg >/dev/null; do
  sleep 0.5
done

#---------- optional niceties ----------
# Hide the mouse cursor after 1 s of inactivity – install: sudo apt install unclutter
command -v unclutter >/dev/null 2>&1 && unclutter --fork --timeout 1 &

# Disable screen blanking / DPMS
xset -dpms
xset s off
xset s noblank

#---------- find Chromium binary ----------
BROWSER=$(command -v chromium-browser || command -v chromium || true)
if [[ -z $BROWSER ]]; then
  echo "Chromium not found.  Install with:  sudo apt install chromium-browser"
  exit 1
fi

#---------- launch in kiosk mode ----------
exec "$BROWSER" \
  --kiosk "$URL" \
  --noerrdialogs \
  --incognito \
  --disable-features=TranslateUI \
  --disable-translate \
  --overscroll-history-navigation=0 \
  --disable-pinch
