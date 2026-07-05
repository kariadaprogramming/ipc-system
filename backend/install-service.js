const Service = require('node-windows').Service;

// Create a new service object
const svc = new Service({
  name: 'IPC Backend',
  description: 'IPC System Backend Server',
  script: 'D:\\ipc-system\\backend\\server.js',
  nodeOptions: [
    '--max-old-space-size=4096'
  ],
  env: {
    name: "NODE_ENV",
    value: "production"
  }
});

// Listen for the "install" event
svc.on('install', function(){
  svc.start();
});

svc.install();
