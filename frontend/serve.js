const { spawn } = require('child_process');
const path = require('path');

// Serve the build folder using the serve package
const servePath = path.join(__dirname, 'node_modules', 'serve', 'bin', 'serve.js');
const buildPath = path.join(__dirname, 'build');

const serve = spawn('node', [servePath, '-s', buildPath, '-l', '3000'], {
  cwd: __dirname,
  stdio: 'inherit'
});

serve.on('error', (err) => {
  console.error('Failed to start serve:', err);
  process.exit(1);
});

serve.on('exit', (code) => {
  console.log(`Serve exited with code ${code}`);
  process.exit(code);
});
