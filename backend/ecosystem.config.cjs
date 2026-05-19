module.exports = {
  apps: [
    {
      name: 'vendr-backend',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
        JWT_SECRET: 'change-this-to-a-strong-secret',
      },
    },
  ],
};
