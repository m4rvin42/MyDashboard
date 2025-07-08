#!/bin/sh
# Start the compose stack with PUBLIC_IP env variable
set -e
# Obtain public IP
PUBLIC_IP=$(curl -s https://api.ipify.org)
export PUBLIC_IP
exec docker compose up --build
