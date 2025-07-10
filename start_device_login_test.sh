#!/bin/sh
# Build and run the standalone MSAL device code test container
set -e
SCRIPT_DIR="$(dirname "$0")"
docker build -t device-code-test "$SCRIPT_DIR/device-code-test"
docker run --rm -it device-code-test

