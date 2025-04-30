#!/bin/bash

set -e

echo "Setting env var for build..."
export NEXT_PUBLIC_IGNORE_BUILD_ERROR=true

echo "Entering nextjs package..."
cd packages/nextjs

echo "Running static export build..."
npm run build

echo "Rewriting asset paths for IPFS compatibility..."

# Fix _next paths in HTML/JS
find out -name "*.html" -exec sed -i '' 's|"/_next|"./_next|g' {} +
find out/_next -name "*.js" -exec sed -i '' 's|"/_next|"./_next|g' {} +

echo "✅ Done! IPFS build is ready in packages/nextjs/out"
