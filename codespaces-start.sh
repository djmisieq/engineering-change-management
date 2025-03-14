#!/bin/bash

# Full-featured script to ensure proper setup and startup of the application in Codespaces
echo "===== ENGINEERING CHANGE MANAGEMENT SYSTEM ====="
echo "Comprehensive Codespaces Startup Script"
echo ""

# Check if we're in a Codespaces environment
if [[ -z "${CODESPACES}" && -z "${GITHUB_CODESPACES}" ]]; then
  echo "[INFO] Not running in GitHub Codespaces environment"
  echo "This script is optimized for GitHub Codespaces, but will attempt to continue..."
fi

# Set error handling
set -e
trap 'echo "[ERROR] An error occurred at line $LINENO. Exiting..."; exit 1' ERR

# Step 1: Ensure correct Node.js version (16.x)
echo "Step 1: Setting up correct Node.js environment..."

# Install nvm if not available
if ! command -v nvm &> /dev/null; then
  echo "  Installing NVM..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  
  # Load nvm
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
else
  echo "  NVM already installed."
fi

# Install and use Node.js 16
echo "  Installing and switching to Node.js 16..."
nvm install 16
nvm use 16

# Verify Node.js version
NODE_VERSION=$(node -v)
echo "  Node.js version: $NODE_VERSION"
if [[ $NODE_VERSION != v16* ]]; then
  echo "  [WARNING] Node.js version is not 16.x. This may cause issues."
else
  echo "  [OK] Using compatible Node.js 16.x."
fi

# Step 2: Clean install of dependencies
echo ""
echo "Step 2: Installing dependencies..."
echo "  Cleaning npm cache..."
npm cache clean --force

echo "  Removing node_modules and package-lock.json..."
rm -rf node_modules
rm -f package-lock.json

echo "  Installing dependencies with legacy peer deps..."
npm install --legacy-peer-deps

# Step 3: Run port diagnostics to check for problems
echo ""
echo "Step 3: Running port diagnostics..."
chmod +x ./diagnose-port.sh
./diagnose-port.sh

# Step 4: Ensure proper Codespaces port forwarding
echo ""
echo "Step 4: Setting up port forwarding..."
# This will be handled automatically by devcontainer.json, but let's verify
if [[ -f ".devcontainer/devcontainer.json" ]]; then
  if grep -q "forwardPorts" .devcontainer/devcontainer.json && \
     grep -q "3000" .devcontainer/devcontainer.json; then
    echo "  [OK] Port forwarding appears to be configured in devcontainer.json"
  else
    echo "  [WARNING] Port forwarding might not be properly configured"
    echo "  Please ensure port 3000 is forwarded in the PORTS tab after the app starts"
  fi
else
  echo "  [WARNING] No devcontainer.json found"
  echo "  Please ensure port 3000 is forwarded in the PORTS tab after the app starts"
fi

# Step 5: Ensure correct environment variables
echo ""
echo "Step 5: Setting environment variables for React app..."
export BROWSER=none
export HOST=0.0.0.0
export PORT=3000
export DANGEROUSLY_DISABLE_HOST_CHECK=true
export NODE_OPTIONS=--openssl-legacy-provider

# Set environment variables explicitly for the React app
echo "  Environment variables set:"
echo "  - BROWSER=none (prevents opening browser automatically)"
echo "  - HOST=0.0.0.0 (binds to all interfaces, important for Codespaces)"
echo "  - PORT=3000 (standard React development port)"
echo "  - NODE_OPTIONS=--openssl-legacy-provider (for Node.js 16+ compatibility)"

# Step 6: Prepare for application startup
echo ""
echo "Step 6: Preparing application for startup..."
echo "  Checking for existence of public/index.html..."
if [[ ! -f "public/index.html" ]]; then
  echo "  Creating public directory and minimal index.html..."
  mkdir -p public
  cat > public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1976d2" />
    <meta name="description" content="System zarządzania zmianą inżynieryjną (ECM)" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>System zarządzania zmianą inżynieryjną</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700&display=swap" />
  </head>
  <body>
    <noscript>Ta aplikacja wymaga JavaScript do działania.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL
fi

echo "  Checking for existence of public/manifest.json..."
if [[ ! -f "public/manifest.json" ]]; then
  cat > public/manifest.json << 'EOL'
{
  "short_name": "ECM System",
  "name": "System zarządzania zmianą inżynieryjną",
  "icons": [],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#1976d2",
  "background_color": "#ffffff"
}
EOL
fi

# Step 7: Run the application with proper logging
echo ""
echo "Step 7: Starting the application..."
echo "  Launching React development server with verbose output..."
echo "  The application will be available at:"
echo "  https://${CODESPACE_NAME}-3000.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/"
echo ""
echo "  [IMPORTANT] After the server starts:"
echo "  1. Go to PORTS tab in bottom panel"
echo "  2. Find port 3000 and ensure it's set to 'Public' visibility"
echo "  3. If it's not 'Public', right-click and change visibility"
echo "  4. Click 'Open in Browser' for port 3000"
echo ""
echo "  Starting server now..."
echo "  (Press Ctrl+C to stop the server when done)"
echo "==========================================================="
echo ""

# Start React development server with verbose output
BROWSER=none HOST=0.0.0.0 PORT=3000 DANGEROUSLY_DISABLE_HOST_CHECK=true NODE_OPTIONS=--openssl-legacy-provider npm start --verbose
