#!/bin/bash
# Script to deploy Sanity Studio
# Usage: ./scripts/deploy-sanity-studio.sh [TOKEN]
#   If TOKEN is provided, it will be used for authentication
#   Otherwise, it will load from .env.local or check for CLI login

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Deploy Sanity Studio"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Load tokens from .env.local if it exists
if [ -f .env.local ]; then
  set -a
  source .env.local
  set +a
fi

# If token provided as argument, use it
if [ -n "$1" ]; then
  export SANITY_AUTH_TOKEN="$1"
  echo "Using provided token for authentication"
elif [ -n "$SANITY_AUTH_TOKEN" ]; then
  echo "Using SANITY_AUTH_TOKEN from environment"
else
  # Check if logged in via CLI
  echo "Checking Sanity login status..."
  npx sanity projects list > /dev/null 2>&1
  
  if [ $? -ne 0 ]; then
    echo "❌ Not logged in to Sanity and no token provided."
    echo ""
    echo "Options:"
    echo "  1. Run: npx sanity login (then run this script again)"
    echo "  2. Run: ./scripts/deploy-sanity-studio.sh YOUR_TOKEN"
    echo "  3. Set: export SANITY_AUTH_TOKEN=YOUR_TOKEN (then run this script)"
    exit 1
  fi
  
  echo "✅ Logged in to Sanity via CLI"
fi

echo ""
echo "Deploying Studio to: https://gentlepiercing.sanity.studio"
echo ""

# Deploy the studio
npx sanity deploy

if [ $? -eq 0 ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ Studio deployed successfully!"
  echo ""
  echo "Your Studio is now live at: https://gentlepiercing.sanity.studio"
  echo "Tables are now available in the content editor."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo ""
  echo "❌ Deployment failed. Please check the error messages above."
  exit 1
fi

