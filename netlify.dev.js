
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Start Vite dev server
const vite = spawn('npm', ['run', 'dev:client'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Start Netlify dev
const netlify = spawn('netlify', ['dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

process.on('SIGINT', () => {
  vite.kill();
  netlify.kill();
  process.exit();
});
