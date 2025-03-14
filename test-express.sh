#!/bin/bash

# Script to install Express.js and run the minimal test server
echo "===== Testing Port Forwarding with Express.js ====="

# Install Express if not already installed
if ! npm list express | grep -q express; then
  echo "Installing Express.js..."
  npm install express --no-save
else
  echo "Express.js is already installed."
fi

# Run the minimal Express server
echo "Starting minimal Express.js server on port 3000..."
echo "Press Ctrl+C to stop the server when finished testing"
echo ""

# Start the server
node minimal-app.js

# Note: This script will not reach this point until you press Ctrl+C to stop the server
echo ""
echo "Test server stopped."
