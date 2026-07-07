module.exports = {
  apps: [{
    name: 'ipc-frontend',
    script: 'serve.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
