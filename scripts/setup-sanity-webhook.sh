#!/bin/bash
# Script to set up Sanity webhook for Vercel deployments
# Usage: ./scripts/setup-sanity-webhook.sh <VERCEL_DEPLOY_HOOK_URL>

if [ -z "$1" ]; then
  echo "Usage: ./scripts/setup-sanity-webhook.sh <VERCEL_DEPLOY_HOOK_URL>"
  echo ""
  echo "To get your Vercel Deploy Hook URL:"
  echo "1. Go to https://vercel.com/ivandankovdigital-9113s-projects/inverness-warszawa/settings"
  echo "2. Navigate to Settings > Git > Deploy Hooks"
  echo "3. Click 'Create Hook'"
  echo "4. Name it: 'Sanity Content Updates'"
  echo "5. Select branch: 'main'"
  echo "6. Copy the generated URL"
  echo "7. Run this script with that URL"
  exit 1
fi

DEPLOY_HOOK_URL="$1"

echo "Creating Sanity webhook..."
echo "URL: $DEPLOY_HOOK_URL"
echo ""

npx sanity hook create \
  --name "Trigger Vercel Rebuild" \
  --url "$DEPLOY_HOOK_URL" \
  --dataset production \
  --on create,update,delete \
  --filter '_type == "post"' \
  --method POST \
  --api-version v2021-06-07

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Webhook created successfully!"
  echo "Now whenever you create, update, or delete a blog post in Sanity,"
  echo "it will automatically trigger a Vercel rebuild."
else
  echo ""
  echo "❌ Failed to create webhook. Make sure you're logged into Sanity:"
  echo "   npx sanity login"
  exit 1
fi









