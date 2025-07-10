#!/bin/sh
# Build and run the simple network connectivity test container
set -e
SCRIPT_DIR="$(dirname "$0")"
docker build -t network-test "$SCRIPT_DIR/network-test"
docker run --rm -it network-test
