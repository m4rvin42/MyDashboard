#!/bin/sh
set -e
cd backend
# Build image if not built
IMAGE_NAME=backend
if ! docker image inspect "$IMAGE_NAME" >/dev/null 2>&1; then
  docker build -t "$IMAGE_NAME" .
fi
exec docker run -p 3000:3000 "$IMAGE_NAME"
