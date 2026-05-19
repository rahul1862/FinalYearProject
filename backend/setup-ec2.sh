#!/bin/bash
# Run this script on a fresh Amazon Linux 2023 / Ubuntu EC2 instance

set -e

# Install Node.js 20
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -
sudo yum install -y nodejs git

# Install PM2 globally
sudo npm install -g pm2

# Clone the repo (replace with your repo URL)
git clone https://github.com/rahul1862/FinalYearProject.git /home/ec2-user/vendr
cd /home/ec2-user/vendr/backend

# Install backend dependencies
npm install --production

# Start the backend with PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup | tail -1 | bash

# Allow port 3001 through the firewall (also open it in the EC2 Security Group)
echo "Backend running on port 3001"
echo "Public IP: $(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)"
