#!/bin/bash
# Script to load Sanity tokens from .env.local
# Usage: source ./scripts/load-sanity-tokens.sh
#   or: . ./scripts/load-sanity-tokens.sh

if [ -f .env.local ]; then
  set -a
  source .env.local
  set +a
  echo "✅ Sanity tokens loaded from .env.local"
  echo "   SANITY_AUTH_TOKEN: ${SANITY_AUTH_TOKEN:0:20}..."
  echo "   SANITY_API_TOKEN: ${SANITY_API_TOKEN:0:20}..."
else
  echo "❌ .env.local file not found"
  echo "   Create it with your Sanity tokens"
  return 1 2>/dev/null || exit 1
fi





