module.exports = {
  apps: [{
    name: 'ipc-frontend',
    script: './node_modules/serve/bin/serve.js',
    args: '-s build -l 3000',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    cwd: __dirname,
    env: {
      NODE_ENV: 'production'
    }
  }]
};
