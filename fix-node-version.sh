#!/bin/bash

# Script to downgrade Node.js version for compatibility with React app
# This solves the "digital envelope routines::unsupported" error

echo "===== Node.js Version Fix Script ====="

# Check current Node.js version
echo "Current Node.js version: $(node -v)"

# Install nvm if not present
if ! command -v nvm &> /dev/null; then
  echo "Installing NVM (Node Version Manager)..."
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
  
  # Source nvm for the current shell
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
fi

# Install Node.js 16 (LTS) and use it
echo "Installing and switching to Node.js v16..."
nvm install 16
nvm use 16

# Verify
echo "New Node.js version: $(node -v)"
echo "New npm version: $(npm -v)"

# Clean npm cache and reinstall dependencies
echo "Cleaning npm cache and reinstalling dependencies..."
npm cache clean --force
rm -rf node_modules
rm -f package-lock.json
npm install

echo ""
echo "===== Fix completed ====="
echo "You can now start the application with:"
echo "npm start"
echo ""
