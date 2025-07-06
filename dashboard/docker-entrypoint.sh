#!/bin/sh
set -e
: "${PUBLIC_IP:=}"
echo "window.PUBLIC_IP='${PUBLIC_IP}'" > /app/dist/env.js
exec node /app/backend/server.js
