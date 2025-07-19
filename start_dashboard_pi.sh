#!/bin/sh
# Start the compose stack and launch Chromium in kiosk mode on Raspberry Pi
set -e

# Obtain public IP
PUBLIC_IP=$(curl -s https://api.ipify.org)
export PUBLIC_IP

# Start containers in the background
docker compose up --build -d

# Wait a moment for the frontend to become available
sleep 5

# Enable kiosk mode to open the dashboard URL
sudo ./kioskctl enable "http://localhost:8080"
