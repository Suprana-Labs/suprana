# Suprana Deployment Guide

Complete guide to deploying Suprana validators and networks.

## Table of Contents
- [Overview](#overview)
- [Deployment Types](#deployment-types)
- [Prerequisites](#prerequisites)
- [Test Validator Deployment](#test-validator-deployment)
- [Production Validator Deployment](#production-validator-deployment)
- [Network Configuration](#network-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)
- [Security Best Practices](#security-best-practices)

## Overview

Suprana supports multiple deployment configurations:
- **Test Validator**: Local development and testing
- **Production Validator**: Mainnet/testnet participation
- **RPC Node**: Serve read-only RPC requests
- **Private Network**: Custom blockchain networks

## Deployment Types

### Test Validator
- **Purpose**: Local development and testing
- **Requirements**: Minimal (8GB RAM, 50GB disk)
- **Network**: Isolated local network
- **Use Cases**: Development, integration testing, demos

### Production Validator
- **Purpose**: Participate in consensus
- **Requirements**: High-end hardware (128GB+ RAM, 2TB+ NVMe SSD)
- **Network**: Connected to mainnet/testnet
- **Use Cases**: Block production, transaction validation

### RPC Node
- **Purpose**: Serve API requests
- **Requirements**: Medium hardware (32GB+ RAM, 1TB SSD)
- **Network**: Connected to mainnet/testnet (read-only)
- **Use Cases**: Application backend, API service

## Prerequisites

### Hardware Requirements

#### Test Validator
```
CPU: 4 cores
RAM: 8GB
Disk: 50GB SSD
Network: Standard broadband
```

#### Production Validator
```
CPU: 12+ cores / 24+ threads (2.8GHz+)
RAM: 128GB (256GB recommended)
Disk: 2TB NVMe SSD (Samsung 980 PRO or better)
Network: 1Gbps+ with <100ms latency
Power: UPS recommended
```

#### RPC Node
```
CPU: 8+ cores
RAM: 32GB (64GB recommended)
Disk: 1TB NVMe SSD
Network: 1Gbps+
```

### Software Requirements

```bash
# Operating System
Ubuntu 22.04 LTS (recommended)
# or
Debian 11+
# or
macOS 13+ (development only)

# Suprana installed
suprana --version

# System limits configured
ulimit -n  # Should be 500000+
```

## Test Validator Deployment

### Quick Start

```bash
# Start test validator with defaults
suprana-test-validator

# Start with custom configuration
suprana-test-validator \
    --ledger ./test-ledger \
    --rpc-port 8899 \
    --reset
```

### Advanced Configuration

```bash
# Start with specific features
suprana-test-validator \
    --ledger ./ledger \
    --rpc-port 8899 \
    --rpc-bind-address 0.0.0.0 \
    --gossip-port 8001 \
    --dynamic-port-range 8002-8020 \
    --limit-ledger-size 50000000 \
    --log \
    --enable-rpc-transaction-history \
    --enable-cpi-and-log-storage
```

### Test Validator Options

```bash
# Slot duration
--slots-per-epoch 432000        # Number of slots per epoch

# Faucet configuration
--faucet-sol 1000000            # Faucet amount in SUP
--faucet-port 9900              # Faucet RPC port

# Account configuration
--account <address> <file>       # Load account from file

# Program deployment
--bpf-program <address> <file>   # Deploy program at address

# Clone accounts from another network
--clone <address>                # Clone account from mainnet

# Network configuration
--url <rpc-url>                  # Source network for cloning
```

### Test Validator Scripts

Create a management script:

```bash
#!/bin/bash
# test-validator.sh

SUPRANA_DIR="$HOME/suprana"
LEDGER_DIR="$SUPRANA_DIR/test-ledger"
LOG_FILE="$SUPRANA_DIR/validator.log"

case "$1" in
    start)
        echo "Starting Suprana test validator..."
        suprana-test-validator \
            --ledger "$LEDGER_DIR" \
            --rpc-port 8899 \
            --log \
            > "$LOG_FILE" 2>&1 &
        echo $! > "$SUPRANA_DIR/validator.pid"
        echo "Started (PID: $(cat $SUPRANA_DIR/validator.pid))"
        ;;
    stop)
        if [ -f "$SUPRANA_DIR/validator.pid" ]; then
            kill $(cat "$SUPRANA_DIR/validator.pid")
            rm "$SUPRANA_DIR/validator.pid"
            echo "Stopped"
        fi
        ;;
    restart)
        $0 stop
        sleep 2
        $0 start
        ;;
    status)
        if [ -f "$SUPRANA_DIR/validator.pid" ]; then
            if ps -p $(cat "$SUPRANA_DIR/validator.pid") > /dev/null; then
                echo "Running (PID: $(cat $SUPRANA_DIR/validator.pid))"
            else
                echo "Not running (stale PID file)"
            fi
        else
            echo "Not running"
        fi
        ;;
    logs)
        tail -f "$LOG_FILE"
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs}"
        exit 1
        ;;
esac
```

## Production Validator Deployment

### System Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install -y libssl-dev libudev-dev pkg-config zlib1g-dev \
    llvm clang make cmake protobuf-compiler

# Configure system limits
cat <<EOF | sudo tee -a /etc/security/limits.conf
* soft nofile 1000000
* hard nofile 1000000
* soft nproc 1000000
* hard nproc 1000000
EOF

# Configure sysctl
cat <<EOF | sudo tee -a /etc/sysctl.conf
net.core.rmem_default = 134217728
net.core.rmem_max = 134217728
net.core.wmem_default = 134217728
net.core.wmem_max = 134217728
vm.max_map_count = 1000000
kernel.nmi_watchdog = 0
EOF

sudo sysctl -p

# Reboot to apply limits
sudo reboot
```

### Create Validator User

```bash
# Create dedicated user
sudo adduser suprana --disabled-password --gecos ""

# Add to sudo group (optional)
sudo usermod -aG sudo suprana

# Switch to validator user
sudo su - suprana
```

### Generate Validator Keys

```bash
# Create keys directory
mkdir -p ~/suprana-validator/keys
cd ~/suprana-validator/keys

# Generate validator identity
suprana-keygen new --outfile validator-keypair.json
export VALIDATOR_PUBKEY=$(suprana-keygen pubkey validator-keypair.json)
echo "Validator Identity: $VALIDATOR_PUBKEY"

# Generate vote account
suprana-keygen new --outfile vote-account-keypair.json
export VOTE_PUBKEY=$(suprana-keygen pubkey vote-account-keypair.json)
echo "Vote Account: $VOTE_PUBKEY"

# Generate authorized withdrawer
suprana-keygen new --outfile authorized-withdrawer-keypair.json
export WITHDRAWER_PUBKEY=$(suprana-keygen pubkey authorized-withdrawer-keypair.json)
echo "Withdrawer: $WITHDRAWER_PUBKEY"

# Backup keys securely!
tar -czf validator-keys-backup-$(date +%Y%m%d).tar.gz *.json
# Store backup offline securely
```

### Fund Validator Accounts

```bash
# For testnet, use airdrop
suprana airdrop 500 $VALIDATOR_PUBKEY

# For mainnet, transfer SUP to validator identity
# Use hardware wallet or secure method
```

### Create Vote Account

```bash
# Create vote account
suprana create-vote-account \
    vote-account-keypair.json \
    validator-keypair.json \
    authorized-withdrawer-keypair.json \
    --commission 10

# Verify vote account
suprana vote-account $VOTE_PUBKEY
```

### Configure Validator

Create `~/suprana-validator/validator.sh`:

```bash
#!/bin/bash

# Configuration
IDENTITY_KEYPAIR="$HOME/suprana-validator/keys/validator-keypair.json"
VOTE_ACCOUNT="$HOME/suprana-validator/keys/vote-account-keypair.json"
LEDGER_PATH="$HOME/suprana-validator/ledger"
LOG_PATH="$HOME/suprana-validator/validator.log"
TRUSTED_VALIDATORS="--trusted-validator <VALIDATOR1_PUBKEY> --trusted-validator <VALIDATOR2_PUBKEY>"

# Start validator
exec solana-validator \
    --identity "$IDENTITY_KEYPAIR" \
    --vote-account "$VOTE_ACCOUNT" \
    --ledger "$LEDGER_PATH" \
    --log "$LOG_PATH" \
    --rpc-port 8899 \
    --dynamic-port-range 8000-8020 \
    --entrypoint entrypoint.suprana.network:8001 \
    --expected-genesis-hash <GENESIS_HASH> \
    $TRUSTED_VALIDATORS \
    --wal-recovery-mode skip_any_corrupted_record \
    --limit-ledger-size 50000000 \
    --enable-rpc-transaction-history \
    --enable-cpi-and-log-storage \
    --full-rpc-api \
    --no-voting \
    --private-rpc
```

### Create Systemd Service

```bash
# Create systemd service file
sudo tee /etc/systemd/system/suprana-validator.service > /dev/null <<EOF
[Unit]
Description=Suprana Validator
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=suprana
LimitNOFILE=1000000
LogRateLimitIntervalSec=0
Environment="PATH=/home/suprana/.local/share/solana/install/active_release/bin:/home/suprana/suprana/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ExecStart=/home/suprana/suprana-validator/validator.sh

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd
sudo systemctl daemon-reload

# Enable validator service
sudo systemctl enable suprana-validator

# Start validator
sudo systemctl start suprana-validator

# Check status
sudo systemctl status suprana-validator

# View logs
sudo journalctl -u suprana-validator -f
```

### Enable Voting

Once synchronized:

```bash
# Remove --no-voting flag from validator.sh
# and restart

sudo systemctl restart suprana-validator

# Verify voting
suprana vote-account $VOTE_PUBKEY
```

## Network Configuration

### Firewall Setup

```bash
# Install UFW
sudo apt install ufw

# Allow SSH
sudo ufw allow 22/tcp

# Allow Suprana ports
sudo ufw allow 8000:8020/tcp  # Dynamic ports
sudo ufw allow 8000:8020/udp  # Dynamic ports
sudo ufw allow 8899/tcp       # RPC (if public)
sudo ufw allow 8900/tcp       # WebSocket (if public)

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

### DNS Configuration

```bash
# Add A record for your validator
validator.yourdomain.com -> YOUR_IP_ADDRESS

# Update validator startup with --public-rpc-address
--public-rpc-address validator.yourdomain.com:8899
```

## Monitoring & Maintenance

### Monitoring Commands

```bash
# Check validator status
suprana validators

# Check vote account
suprana vote-account $VOTE_PUBKEY

# Check balance
suprana balance $VALIDATOR_PUBKEY

# Check catchup status
suprana catchup $VALIDATOR_PUBKEY

# Check block production
suprana block-production

# Check gossip
suprana-gossip spy --entrypoint entrypoint.suprana.network:8001
```

### Monitoring Script

```bash
#!/bin/bash
# monitor.sh

while true; do
    clear
    echo "=== Suprana Validator Monitor ==="
    echo ""
    echo "Block Height: $(suprana block-height)"
    echo "Slot: $(suprana slot)"
    echo "Epoch: $(suprana epoch-info | grep Epoch | awk '{print $2}')"
    echo ""
    echo "=== Validator Status ==="
    suprana validators | grep $VALIDATOR_PUBKEY
    echo ""
    echo "=== System Resources ==="
    free -h | grep Mem
    df -h | grep /home/suprana/suprana-validator/ledger
    echo ""
    sleep 30
done
```

### Log Rotation

```bash
# Create logrotate configuration
sudo tee /etc/logrotate.d/suprana-validator > /dev/null <<EOF
/home/suprana/suprana-validator/*.log {
    daily
    missingok
    rotate 7
    compress
    notifempty
    create 0644 suprana suprana
    postrotate
        systemctl reload suprana-validator > /dev/null 2>&1 || true
    endscript
}
EOF
```

### Automated Backups

```bash
#!/bin/bash
# backup.sh

BACKUP_DIR="$HOME/backups"
DATE=$(date +%Y%m%d-%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup keys (most important!)
tar -czf "$BACKUP_DIR/keys-$DATE.tar.gz" \
    ~/suprana-validator/keys/*.json

# Backup configuration
cp ~/suprana-validator/validator.sh \
    "$BACKUP_DIR/validator-config-$DATE.sh"

# Keep only last 30 days
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete

# Upload to secure remote storage
# rsync -avz "$BACKUP_DIR/" user@backup-server:/backups/suprana/
```

## Security Best Practices

### Key Security

1. **Never store keys on validator server long-term**
   - Generate offline, transfer securely
   - Delete after setup or encrypt

2. **Use hardware wallets for withdrawer keys**
   - Ledger or Trezor for authorized withdrawer
   - Never expose withdrawer private key

3. **Implement key rotation**
   - Regularly rotate validator identity
   - Update vote account authorized voters

### Server Security

```bash
# Disable root login
sudo sed -i 's/PermitRootLogin yes/PermitRootLogin no/' /etc/ssh/sshd_config

# Use SSH keys only
sudo sed -i 's/#PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config

# Restart SSH
sudo systemctl restart sshd

# Install fail2ban
sudo apt install fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Configure automatic security updates
sudo apt install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

### Monitoring Alerts

Set up monitoring with:
- **Prometheus + Grafana**: Metrics visualization
- **Alertmanager**: Email/Slack alerts
- **UptimeRobot**: External monitoring

## Troubleshooting

### Validator Not Catching Up

```bash
# Check snapshot download
suprana catchup $VALIDATOR_PUBKEY

# Manually download snapshot
suprana-validator --ledger ~/suprana-validator/ledger \
    download-snapshot --snapshot-archive-path ~/snapshots
```

### High Memory Usage

```bash
# Limit ledger size
--limit-ledger-size 50000000  # ~50GB

# Increase system swap
sudo fallocate -l 64G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
```

### Poor Network Performance

```bash
# Test network latency
ping entrypoint.suprana.network

# Check bandwidth
speedtest-cli

# Monitor network usage
iftop -i eth0
```

## Next Steps

- **[Network Setup](NETWORK_SETUP.md)** - Configure network settings
- **[Monitoring Guide](MONITORING.md)** - Set up comprehensive monitoring
- **[Troubleshooting](TROUBLESHOOTING.md)** - Common issues and solutions

---

**Need help?** Join our Discord community or check the troubleshooting guide.
