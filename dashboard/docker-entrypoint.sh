#!/bin/sh
set -e
: "${PUBLIC_IP:=}"
echo "window.PUBLIC_IP='${PUBLIC_IP}'" > /usr/share/nginx/html/env.js
: "${VERSION:=unknown}"
echo "window.VERSION='${VERSION}'" >> /usr/share/nginx/html/env.js
exec nginx -g 'daemon off;'
