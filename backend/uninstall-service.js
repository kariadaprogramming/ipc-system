const Service = require('node-windows').Service;

const svc = new Service({
  name: 'IPC Backend',
  script: 'C:\\Users\\YourUser\\Documents\\Projects\\ipc-system\\backend\\server.js'
});

svc.uninstall();
