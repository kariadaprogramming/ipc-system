const Service = require('node-windows').Service;

const svc = new Service({
  name: 'IPC Frontend',
  script: 'C:\\Users\\YourUser\\Documents\\Projects\\ipc-system\\frontend\\node_modules\\react-scripts\\scripts\\start.js'
});

svc.uninstall();
