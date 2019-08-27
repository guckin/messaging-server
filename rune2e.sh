#!/usr/bin/env bash

set -e

npm run start &
PROCESS_PID=$!
sleep 0.5
PORT=8080 npm run test -- -c './jest.e2e.config.js' || true
kill -9 "$PROCESS_PID"
