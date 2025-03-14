#!/bin/bash

# Script to start the application with proper Node.js settings
# This helps overcome OpenSSL issues in newer Node.js versions

echo "=== Starting Engineering Change Management Dev Server ==="

# Set the OpenSSL legacy provider for Node.js >= 17
export NODE_OPTIONS=--openssl-legacy-provider

# Set environment variables for development
export BROWSER=none
export HOST=0.0.0.0
export DANGEROUSLY_DISABLE_HOST_CHECK=true

# Start the React development server
npm start
