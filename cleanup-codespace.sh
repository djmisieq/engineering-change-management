#!/bin/bash

# Cleanup script for resolving Codespace issues
echo "===== ECM System - Codespace Cleanup ====="

# Make script executable
chmod +x cleanup-codespace.sh

# Force reset of local repo to match remote
echo "Resetting local repository to match remote..."
git fetch origin main
git reset --hard origin/main

# Run setup script
echo "Running setup script..."
bash ./setup-codespace.sh

echo "===== Cleanup Complete ====="
echo "You can now run 'npm start' to launch the application"
