#!/bin/bash

# Setup script for Engineering Change Management in Codespace
echo "===== ECM System - Codespace Setup ====="

# Make script executable
chmod +x setup-codespace.sh

# Force reset of local repo to match remote
echo "Resetting local repository to match remote..."
git fetch origin
git reset --hard origin/main

# Ensure public directory exists
echo "Ensuring public directory exists..."
mkdir -p public

# Create basic index.html if it doesn't exist
if [ ! -f "public/index.html" ]; then
  echo "Creating public/index.html..."
  cat > public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#1976d2" />
    <meta
      name="description"
      content="System zarządzania zmianą inżynieryjną (ECM)"
    />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>System zarządzania zmianą inżynieryjną</title>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
  </head>
  <body>
    <noscript>Ta aplikacja wymaga JavaScript do działania.</noscript>
    <div id="root"></div>
  </body>
</html>
EOL
fi

# Create basic manifest.json if it doesn't exist
if [ ! -f "public/manifest.json" ]; then
  echo "Creating public/manifest.json..."
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

# Create basic robots.txt if it doesn't exist
if [ ! -f "public/robots.txt" ]; then
  echo "Creating public/robots.txt..."
  cat > public/robots.txt << 'EOL'
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:
EOL
fi

# Install dependencies
echo "Installing dependencies..."
npm install

echo "===== Setup Complete ====="
echo "Run 'npm start' to launch the application"
