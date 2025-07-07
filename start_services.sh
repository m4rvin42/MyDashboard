#!/bin/sh
set -e
PUBLIC_IP=$(curl -s https://api.ipify.org)
export PUBLIC_IP
exec docker compose up --build
