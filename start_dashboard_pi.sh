#!/bin/sh
# Start the compose stack and launch Chromium in kiosk mode on Raspberry Pi
set -e

# Obtain public IP
PUBLIC_IP=192.168.2.74
#$(curl -s https://api.ipify.org)
export PUBLIC_IP

# Start containers in the background
docker compose up --build -d

# Wait for the frontend to respond
until curl -sf http://localhost:8080 >/dev/null; do
  sleep 1
done

# Enable kiosk mode to open the dashboard URL
sudo KIOSK_USER=jan ./kioskctl enable "http://localhost:8080"
