#!/bin/sh
set -e

# Print local network IP address
local_ip=$(hostname -I 2>/dev/null | awk '{print $1}')
if [ -z "$local_ip" ]; then
  local_ip=$(ip addr show 2>/dev/null | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | grep -v '^127' | head -n1)
fi
if [ -n "$local_ip" ]; then
  echo "Local network IP: $local_ip"
else
  echo "Could not determine local IP address"
fi

# Start the Vite dev server inside the dashboard directory
npm --prefix dashboard run dev

