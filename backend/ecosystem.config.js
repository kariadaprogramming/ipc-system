module.exports = {
  apps: [{
    name: 'ipc-system',
    script: './backend/server.js',
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    min_uptime: '10s',
    restart_delay: 4000,
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 5000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
