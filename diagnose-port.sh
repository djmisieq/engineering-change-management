#!/bin/bash

# Script to diagnose port issues in Codespaces
echo "===== PORT DIAGNOSTICS TOOL ====="
echo "Running diagnostics to check for port 3000 issues..."
echo ""

# Check Node.js version
echo "1. Node.js Environment:"
echo "   Node.js version: $(node -v)"
echo "   npm version: $(npm -v)"
echo ""

# Check if port 3000 is already in use
echo "2. Checking if port 3000 is already in use:"
if command -v lsof &> /dev/null; then
  PORT_CHECK=$(lsof -i :3000 | grep LISTEN)
  if [ -n "$PORT_CHECK" ]; then
    echo "   [WARNING] Port 3000 is already in use:"
    echo "$PORT_CHECK"
    echo "   You may need to kill the process using port 3000."
  else
    echo "   [OK] Port 3000 is not currently in use."
  fi
else
  echo "   [INFO] lsof not available - cannot check port usage."
  echo "   Checking with netstat instead:"
  netstat -tuln | grep 3000 || echo "   [OK] Port 3000 appears to be free."
fi
echo ""

# Check for running React processes
echo "3. Checking for running React processes:"
ps aux | grep -i react | grep -v grep || echo "   [INFO] No React processes found."
echo ""

# Check firewall settings
echo "4. Checking firewall settings:"
if command -v ufw &> /dev/null; then
  ufw status || echo "   [INFO] Cannot check UFW status."
else
  echo "   [INFO] UFW not installed."
fi
echo ""

# Check devcontainer.json for port forwarding
echo "5. Checking devcontainer.json port forwarding:"
if [ -f ".devcontainer/devcontainer.json" ]; then
  grep -A5 "forwardPorts" .devcontainer/devcontainer.json || echo "   [WARNING] No port forwarding found in devcontainer.json"
  grep -A10 "portsAttributes" .devcontainer/devcontainer.json || echo "   [WARNING] No port attributes found in devcontainer.json"
else
  echo "   [WARNING] No devcontainer.json found."
fi
echo ""

# Check React start script in package.json
echo "6. Checking package.json start script:"
if [ -f "package.json" ]; then
  grep -A1 "\"start\":" package.json || echo "   [WARNING] No start script found in package.json"
else
  echo "   [WARNING] No package.json found."
fi
echo ""

# Check network interfaces
echo "7. Network interfaces and IP addresses:"
ip addr show | grep -E "inet " || echo "   [INFO] Could not get IP addresses."
echo ""

# Check if we're in a container
echo "8. Container environment check:"
if [ -f "/.dockerenv" ] || grep -q docker /proc/1/cgroup 2>/dev/null; then
  echo "   [INFO] This is running inside a container."
else
  echo "   [INFO] This does not appear to be running in a container."
fi
echo ""

# Try a test server on port 3000
echo "9. Testing port 3000 availability with temporary HTTP server:"
echo "   Starting temporary server on port 3000 (will run for 5 seconds)..."
(
  python3 -m http.server 3000 &>/dev/null &
  PY_SERVER_PID=$!
  sleep 5
  kill $PY_SERVER_PID 2>/dev/null
  wait $PY_SERVER_PID 2>/dev/null
) &
# Wait a second for server to start
sleep 1
# Try to connect to it
if curl -s http://localhost:3000 &>/dev/null; then
  echo "   [OK] Successfully connected to test server on port 3000."
else
  echo "   [WARNING] Could not connect to test server on port 3000."
fi
echo ""

echo "===== DIAGNOSTICS COMPLETE ====="
echo "If you're still having issues, make sure that:"
echo "1. Your React app is correctly binding to 0.0.0.0, not just localhost"
echo "2. The port is set to be public in the PORTS tab of Codespaces"
echo "3. There are no firewall/network restrictions in your environment"
echo ""
