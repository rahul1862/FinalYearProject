#!/bin/bash
# Runs on the EC2 instance (as root) to install dependencies and start the app.
set -e

DEPLOY_SRC=/tmp/vendr-deploy
BACKEND_DIR=/opt/vendr/backend
FRONTEND_DIR=/var/www/vendr
ENV_FILE=/opt/vendr/.env

echo "==> Installing Node.js 20 and Nginx"
curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
dnf install -y nodejs nginx

echo "==> Installing PM2"
npm install -g pm2

echo "==> Creating app directories"
mkdir -p "$BACKEND_DIR" "$FRONTEND_DIR" /opt/vendr

echo "==> Deploying frontend"
cp -r "$DEPLOY_SRC/dist/." "$FRONTEND_DIR/"

echo "==> Deploying backend"
cp -r "$DEPLOY_SRC/backend/." "$BACKEND_DIR/"
cd "$BACKEND_DIR"
npm install --production

echo "==> Configuring Nginx"
cp "$DEPLOY_SRC/nginx.conf" /etc/nginx/conf.d/vendr.conf
# Remove default config that would conflict
rm -f /etc/nginx/conf.d/default.conf /etc/nginx/sites-enabled/default 2>/dev/null || true

echo "==> Setting up environment"
if [ ! -f "$ENV_FILE" ]; then
    JWT_SECRET=$(openssl rand -base64 32)
    echo "JWT_SECRET=$JWT_SECRET" > "$ENV_FILE"
    echo "    Generated new JWT_SECRET (saved to $ENV_FILE)"
fi
source "$ENV_FILE"

echo "==> Creating PM2 ecosystem file"
cat > "$BACKEND_DIR/ecosystem.config.cjs" << PMEOF
module.exports = {
  apps: [{
    name: 'vendr-backend',
    script: 'server.js',
    cwd: '$BACKEND_DIR',
    env: {
      PORT: 3001,
      JWT_SECRET: '$JWT_SECRET'
    }
  }]
}
PMEOF

echo "==> Starting backend with PM2"
cd "$BACKEND_DIR"
pm2 delete vendr-backend 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 startup systemd
pm2 save

echo "==> Starting Nginx"
systemctl enable nginx
systemctl restart nginx

echo ""
echo "======================================"
echo "  Setup complete!"
echo "======================================"
