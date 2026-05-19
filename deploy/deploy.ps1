# Vendr AWS Deployment Script
# Launches a t2.micro EC2 instance and deploys the frontend + backend.
# Prerequisites: AWS CLI configured (run 'aws configure'), OpenSSH available.
#
# Usage: cd deploy; .\deploy.ps1
# To change region, edit the $REGION variable below.

$ErrorActionPreference = "Stop"

# ── Configuration ─────────────────────────────────────────────────────────────
$REGION        = (aws configure get region 2>$null); if (-not $REGION) { $REGION = "us-east-1" }
$INSTANCE_TYPE = "t2.micro"
$KEY_NAME      = "vendr-key"
$SG_NAME       = "vendr-sg"
$APP_TAG       = "vendr"

$SCRIPT_DIR    = $PSScriptRoot
$ROOT_DIR      = Split-Path $SCRIPT_DIR -Parent
$FRONTEND_DIR  = Join-Path $ROOT_DIR "Ecommerce app"
$BACKEND_DIR   = Join-Path $ROOT_DIR "backend"
$KEY_FILE      = Join-Path $SCRIPT_DIR "$KEY_NAME.pem"
$STAGE_DIR     = Join-Path $env:TEMP "vendr-deploy-stage"

function Write-Step($msg) { Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Ok($msg)   { Write-Host "    OK: $msg" -ForegroundColor Green }
function Write-Warn($msg) { Write-Host "    WARN: $msg" -ForegroundColor Yellow }

# ── 1. Check AWS credentials ──────────────────────────────────────────────────
Write-Step "Verifying AWS credentials (region: $REGION)"
$ACCOUNT = aws sts get-caller-identity --query 'Account' --output text
if ($LASTEXITCODE -ne 0) { throw "AWS CLI not configured. Run 'aws configure' first." }
Write-Ok "Authenticated as account $ACCOUNT"

# ── 2. Build frontend ─────────────────────────────────────────────────────────
Write-Step "Building React frontend"
Push-Location $FRONTEND_DIR
npm run build
if ($LASTEXITCODE -ne 0) { Pop-Location; throw "Frontend build failed." }
Pop-Location
Write-Ok "Build output: $FRONTEND_DIR\dist"

# ── 3. Stage files for upload (exclude node_modules) ─────────────────────────
Write-Step "Staging files"
if (Test-Path $STAGE_DIR) { Remove-Item -Recurse -Force $STAGE_DIR }
New-Item -ItemType Directory -Path "$STAGE_DIR\backend\middleware" | Out-Null
New-Item -ItemType Directory -Path "$STAGE_DIR\backend\routes"     | Out-Null
New-Item -ItemType Directory -Path "$STAGE_DIR\dist"               | Out-Null

Copy-Item -Recurse "$FRONTEND_DIR\dist\*" "$STAGE_DIR\dist\"
Copy-Item "$BACKEND_DIR\server.js"        "$STAGE_DIR\backend\"
Copy-Item "$BACKEND_DIR\db.js"            "$STAGE_DIR\backend\"
Copy-Item "$BACKEND_DIR\package.json"     "$STAGE_DIR\backend\"
Copy-Item "$BACKEND_DIR\middleware\*.js"  "$STAGE_DIR\backend\middleware\"
Copy-Item "$BACKEND_DIR\routes\*.js"      "$STAGE_DIR\backend\routes\"
Copy-Item "$SCRIPT_DIR\nginx.conf"        "$STAGE_DIR\"
Copy-Item "$SCRIPT_DIR\setup.sh"          "$STAGE_DIR\"
Write-Ok "Staged to $STAGE_DIR"

# ── 4. SSH key pair ───────────────────────────────────────────────────────────
Write-Step "SSH key pair"
$existingKey = aws ec2 describe-key-pairs --key-names $KEY_NAME --region $REGION `
    --query 'KeyPairs[0].KeyName' --output text 2>$null
if ($existingKey -ne $KEY_NAME -or -not (Test-Path $KEY_FILE)) {
    Write-Warn "Creating new key pair '$KEY_NAME'"
    aws ec2 delete-key-pair --key-name $KEY_NAME --region $REGION 2>$null
    $keyMaterial = aws ec2 create-key-pair --key-name $KEY_NAME --region $REGION `
        --query 'KeyMaterial' --output text
    $keyMaterial | Out-File -Encoding ascii -FilePath $KEY_FILE -NoNewline
    Write-Ok "Key saved to $KEY_FILE — back this up, you can't recover it"
} else {
    Write-Ok "Using existing key pair (key file: $KEY_FILE)"
}

# Restrict key file permissions so OpenSSH accepts it
$acl = Get-Acl $KEY_FILE
$acl.SetAccessRuleProtection($true, $false)
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule(
    $env:USERNAME, "FullControl", "Allow")
$acl.SetAccessRule($rule)
Set-Acl $KEY_FILE $acl

# ── 5. Security group ─────────────────────────────────────────────────────────
Write-Step "Security group"
$VPC_ID = aws ec2 describe-vpcs --filters Name=isDefault,Values=true `
    --query 'Vpcs[0].VpcId' --output text --region $REGION
$SG_ID = aws ec2 describe-security-groups `
    --filters "Name=group-name,Values=$SG_NAME" "Name=vpc-id,Values=$VPC_ID" `
    --query 'SecurityGroups[0].GroupId' --output text --region $REGION 2>$null

if ($SG_ID -eq "None" -or -not $SG_ID) {
    $SG_ID = aws ec2 create-security-group `
        --group-name $SG_NAME `
        --description "Vendr app - HTTP + SSH" `
        --vpc-id $VPC_ID `
        --query 'GroupId' --output text --region $REGION
    aws ec2 authorize-security-group-ingress --group-id $SG_ID --region $REGION `
        --ip-permissions `
        "IpProtocol=tcp,FromPort=22,ToPort=22,IpRanges=[{CidrIp=0.0.0.0/0}]" `
        "IpProtocol=tcp,FromPort=80,ToPort=80,IpRanges=[{CidrIp=0.0.0.0/0}]" | Out-Null
    Write-Ok "Created security group $SG_ID (ports 22, 80 open)"
} else {
    Write-Ok "Using existing security group $SG_ID"
}

# ── 6. Find latest Amazon Linux 2023 AMI ─────────────────────────────────────
Write-Step "Finding latest Amazon Linux 2023 AMI"
$AMI_ID = aws ssm get-parameter `
    --name "/aws/service/ami-amazon-linux-latest/al2023-ami-kernel-default-x86_64" `
    --query 'Parameter.Value' --output text --region $REGION
Write-Ok "AMI: $AMI_ID"

# ── 7. Launch EC2 instance ────────────────────────────────────────────────────
Write-Step "Launching t2.micro instance"
$INSTANCE_ID = aws ec2 run-instances `
    --image-id $AMI_ID `
    --instance-type $INSTANCE_TYPE `
    --key-name $KEY_NAME `
    --security-group-ids $SG_ID `
    --count 1 `
    --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=$APP_TAG}]" `
    --query 'Instances[0].InstanceId' --output text --region $REGION
Write-Ok "Instance launched: $INSTANCE_ID"

# ── 8. Wait for instance running + get IP ────────────────────────────────────
Write-Step "Waiting for instance to start (1-2 min)"
aws ec2 wait instance-running --instance-ids $INSTANCE_ID --region $REGION
$PUBLIC_IP = aws ec2 describe-instances --instance-ids $INSTANCE_ID `
    --query 'Reservations[0].Instances[0].PublicIpAddress' `
    --output text --region $REGION
Write-Ok "Running at $PUBLIC_IP"

# ── 9. Wait for SSH ───────────────────────────────────────────────────────────
Write-Step "Waiting for SSH (up to 3 min)"
$SSH_OPTS = @("-o", "StrictHostKeyChecking=no", "-o", "ConnectTimeout=5",
              "-o", "BatchMode=yes", "-i", $KEY_FILE)
$SSH_READY = $false
for ($i = 1; $i -le 36; $i++) {
    Start-Sleep 5
    $result = ssh @SSH_OPTS "ec2-user@$PUBLIC_IP" "echo ready" 2>$null
    if ($result -eq "ready") { $SSH_READY = $true; break }
    Write-Host "    attempt $i/36..." -NoNewline
    Write-Host ""
}
if (-not $SSH_READY) { throw "SSH unavailable after 3 minutes. Instance ID: $INSTANCE_ID" }
Write-Ok "SSH ready"

# ── 10. Upload files ──────────────────────────────────────────────────────────
Write-Step "Uploading app files"
$SCP_OPTS = @("-o", "StrictHostKeyChecking=no", "-i", $KEY_FILE)
$DEST = "ec2-user@${PUBLIC_IP}:/tmp/vendr-deploy"

ssh @SSH_OPTS "ec2-user@$PUBLIC_IP" "mkdir -p /tmp/vendr-deploy"
scp @SCP_OPTS -r "$STAGE_DIR\dist"    "$DEST/"
scp @SCP_OPTS -r "$STAGE_DIR\backend" "$DEST/"
scp @SCP_OPTS    "$STAGE_DIR\nginx.conf" "$DEST/"
scp @SCP_OPTS    "$STAGE_DIR\setup.sh"   "$DEST/"
Write-Ok "Files uploaded"

# ── 11. Run server setup ──────────────────────────────────────────────────────
Write-Step "Running server setup (2-3 min)"
ssh @SSH_OPTS "ec2-user@$PUBLIC_IP" "chmod +x /tmp/vendr-deploy/setup.sh && sudo /tmp/vendr-deploy/setup.sh"
Write-Ok "Server setup complete"

# ── Done ──────────────────────────────────────────────────────────────────────
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  Vendr is live!" -ForegroundColor Green
Write-Host "  http://$PUBLIC_IP" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  SSH:       ssh -i `"$KEY_FILE`" ec2-user@$PUBLIC_IP"
Write-Host "  PM2 logs:  ssh in, then: pm2 logs"
Write-Host "  Region:    $REGION"
Write-Host "  Instance:  $INSTANCE_ID"
Write-Host ""
Write-Host "  To stop billing: aws ec2 stop-instances --instance-ids $INSTANCE_ID --region $REGION"
