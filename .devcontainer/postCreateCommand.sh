#!/bin/bash

# Post-create script for GitHub Codespaces

echo "===== Running post-create setup ====="

# Install nvm (Node Version Manager)
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Source nvm in the current shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  

# Install and use Node.js v16 (LTS)
echo "Installing Node.js v16..."
nvm install 16
nvm use 16

# Verify Node.js and npm versions
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"

# Clean npm cache
npm cache clean --force

# Run the regular setup script
echo "Running main setup script..."
bash ./setup-codespace.sh

echo "===== Post-create setup completed ====="
