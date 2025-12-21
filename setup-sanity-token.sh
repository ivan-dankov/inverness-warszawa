#!/bin/bash
# Script to set up Sanity authentication token
# Usage: ./setup-sanity-token.sh YOUR_TOKEN_HERE

if [ -z "$1" ]; then
  echo "Usage: ./setup-sanity-token.sh YOUR_TOKEN_HERE"
  echo ""
  echo "To get your token:"
  echo "1. Go to https://sanity.io/manage"
  echo "2. Select your project (nfwijj0y)"
  echo "3. Go to Settings > API > Tokens"
  echo "4. Create a new token with Editor or Administrator permissions"
  echo "5. Copy the token and run this script with it"
  exit 1
fi

export SANITY_AUTH_TOKEN="$1"
echo "✅ SANITY_AUTH_TOKEN has been set for this terminal session"
echo ""
echo "To make it permanent, add this line to your ~/.zshrc or ~/.bashrc:"
echo "export SANITY_AUTH_TOKEN=\"$1\""
echo ""
echo "Now you can run: npx sanity deploy"

