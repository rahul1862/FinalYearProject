#!/bin/bash
exec > /var/log/vendr-setup.log 2>&1
set -e

echo "==> Installing Node.js 20, Nginx, Git"
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
dnf install -y nodejs nginx git

echo "==> Installing PM2"
npm install -g pm2

echo "==> Cloning repo"
git clone https://github.com/rahul1862/FinalYearProject.git /opt/vendr-repo

echo "==> Building frontend"
cd "/opt/vendr-repo/Ecommerce app"
npm install
npm run build

echo "==> Copying frontend build"
mkdir -p /var/www/vendr
cp -r "/opt/vendr-repo/Ecommerce app/dist/." /var/www/vendr/

echo "==> Setting up backend"
mkdir -p /opt/vendr
cp -r /opt/vendr-repo/backend /opt/vendr/backend
cd /opt/vendr/backend
npm install --production

echo "==> Configuring Nginx"
cat > /etc/nginx/conf.d/vendr.conf << 'NGINX'
server {
    listen 80;
    server_name _;
    root /var/www/vendr;
    index index.html;

    location /api/ {
        proxy_pass       http://127.0.0.1:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX
rm -f /etc/nginx/conf.d/default.conf

echo "==> Generating JWT secret and starting backend"
JWT_SECRET=$(openssl rand -base64 32)

cat > /opt/vendr/backend/ecosystem.config.cjs << PMEOF
module.exports = {
  apps: [{
    name: 'vendr-backend',
    script: 'server.js',
    cwd: '/opt/vendr/backend',
    env: { PORT: 3001, JWT_SECRET: '$JWT_SECRET' }
  }]
}
PMEOF

pm2 start /opt/vendr/backend/ecosystem.config.cjs
pm2 startup systemd
pm2 save

echo "==> Starting Nginx"
systemctl enable nginx
systemctl start nginx

echo "==> DONE - Vendr is running"
