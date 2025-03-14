#!/bin/bash

# Script to switch between full and simple app version 
# This is helpful when debugging Codespaces issues

echo "=== ECM App Version Switcher ==="

if [ "$1" == "simple" ]; then
  # Check if we need to back up original App.tsx
  if [ ! -f "src/App.tsx.bak" ]; then
    echo "Backing up original App.tsx to App.tsx.bak..."
    cp src/App.tsx src/App.tsx.bak
  fi
  
  echo "Switching to simplified App version..."
  cp src/App.simple.tsx src/App.tsx
  echo "Done! Restart the application to see changes."
  
elif [ "$1" == "restore" ] || [ "$1" == "full" ]; then
  # Check if backup exists
  if [ -f "src/App.tsx.bak" ]; then
    echo "Restoring full App version from backup..."
    cp src/App.tsx.bak src/App.tsx
    echo "Done! Restart the application to see changes."
  else
    echo "Error: No backup file found at src/App.tsx.bak"
    echo "Cannot restore original App version."
    exit 1
  fi
  
else
  echo "Usage: bash switch-app-version.sh [simple|restore]"
  echo ""
  echo "  simple  - Switch to a simplified App version for testing"
  echo "  restore - Restore the original full App version"
  echo ""
  exit 1
fi
