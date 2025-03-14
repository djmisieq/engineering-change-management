// A minimal Express.js server to test port forwarding
// Run with: node minimal-app.js

const express = require('express');
const app = express();
const port = 3000;

// Serve static content
app.use(express.static('public'));

// Root route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Server</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
        }
        .success {
          color: green;
          font-weight: bold;
        }
        .container {
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 20px;
          margin-top: 20px;
        }
        h1 {
          color: #333;
        }
        pre {
          background: #f4f4f4;
          padding: 10px;
          border-radius: 5px;
          overflow-x: auto;
        }
      </style>
    </head>
    <body>
      <h1>Engineering Change Management - Test Server</h1>
      <p class="success">✅ If you're seeing this page, the Express server is running correctly on port ${port}!</p>
      
      <div class="container">
        <h2>Server Information</h2>
        <ul>
          <li><strong>Node.js Version:</strong> ${process.version}</li>
          <li><strong>Express Version:</strong> ${require('express/package.json').version}</li>
          <li><strong>Server Port:</strong> ${port}</li>
          <li><strong>Request URL:</strong> ${req.protocol}://${req.get('host')}${req.originalUrl}</li>
          <li><strong>Remote Address:</strong> ${req.ip}</li>
        </ul>
      </div>

      <div class="container">
        <h2>Next Steps</h2>
        <ol>
          <li>This server confirms your port 3000 is accessible</li>
          <li>If you can see this page but not your React app, the issue is likely with the React app itself, not with port forwarding</li>
          <li>Try running your React app with explicit HOST and PORT:</li>
        </ol>
        <pre>HOST=0.0.0.0 PORT=3000 BROWSER=none npm start</pre>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Test server running at http://localhost:${port}`);
  console.log(`Bound to all interfaces (0.0.0.0) for Codespaces compatibility`);
  console.log(`Press Ctrl+C to stop the server`);
});
