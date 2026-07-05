const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'IPC Frontend',
  description: 'IPC System Frontend Server',
  script: 'D:\\ipc-system\\frontend\\node_modules\\react-scripts\\scripts\\start.js',
  scriptOptions: [
    '--',
    'D:\\ipc-system\\frontend'
  ],
  workingDirectory: 'C:\\ipc-system\\frontend',
  nodeOptions: [
    '--max-old-space-size=4096'
  ],
  env: {
    name: "PORT",
    value: "3000"
  }
});

// Listen for the "install" event
svc.on('install', function(){
  svc.start();
});

svc.install();
