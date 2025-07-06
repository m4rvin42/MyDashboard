#!/bin/sh
# Build and run the dashboard container with PUBLIC_IP env variable
set -e
IMAGE_NAME=dashboard
SCRIPT_DIR="$(dirname "$0")/dashboard"

# Build image if not already built
docker build -t "$IMAGE_NAME" "$SCRIPT_DIR"

# Ensure backend dependencies and start server in background
npm install --prefix server >/dev/null
npm start --prefix server &
SERVER_PID=$!

# Obtain public IP
PUBLIC_IP=$(curl -s https://api.ipify.org)

# Run container with IP env var
docker run -p 8080:80 -e PUBLIC_IP="$PUBLIC_IP" "$IMAGE_NAME"

# Cleanup background server after container exits
kill "$SERVER_PID" 2>/dev/null || true
wait "$SERVER_PID" 2>/dev/null || true
