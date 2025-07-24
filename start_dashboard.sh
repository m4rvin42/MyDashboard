#!/bin/sh
# Start the compose stack with PUBLIC_IP env variable
set -e
# Obtain public IP
PUBLIC_IP=192.168.2.35 #$(curl -s https://api.ipify.org)
export PUBLIC_IP
exec docker compose up
