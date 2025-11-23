# Suprana

A high-performance blockchain fork optimized for decentralized applications.

## Overview

**Suprana** is a blockchain network featuring:
- **Native Token**: SUP
- **Total Supply**: 10 Billion SUP
- **Block Time**: ~200ms
- **Consensus**: Proof of History (PoH) + Proof of Stake (PoS)

## Quick Start

### 1. Start Suprana Validator

```bash
cd /Users/yousefhosseini/Dropbox/PAI/Pai2v3compact/testnet/suprana
./bin/suprana-test-validator
```

### 2. Configure Suprana CLI

```bash
# Add to PATH
export PATH="/Users/yousefhosseini/Dropbox/PAI/Pai2v3compact/testnet/suprana/bin:$PATH"

# Set network
export SUPRANA_NETWORK="http://localhost:8899"

# Check version
suprana --version

# Check cluster
suprana cluster-version
```

### 3. Create Wallet

```bash
# Generate new keypair
suprana-keygen new

# Check balance
suprana balance

# Get address
suprana address
```

### 4. Airdrop SUP

```bash
# Airdrop 1000 SUP to your wallet
suprana airdrop 1000

# Check balance
suprana balance
```

### 5. Send SUP

```bash
suprana transfer <RECIPIENT_ADDRESS> <AMOUNT>
```

## Network Configuration

- **RPC Endpoint**: http://localhost:8899
- **WebSocket**: ws://localhost:8900
- **Native Token**: SUP
- **Decimals**: 9 (1 SUP = 1,000,000,000 lamports)
- **Total Supply**: 10,000,000,000 SUP

## Commands

All Suprana commands mirror standard blockchain CLI:

```bash
suprana --help                    # Show help
suprana cluster-version          # Get cluster version
suprana balance                  # Check wallet balance
suprana address                  # Show wallet address
suprana airdrop <amount>         # Airdrop SUP (testnet only)
suprana transfer <to> <amount>   # Send SUP
suprana account <address>        # Get account info
suprana block-height             # Current block height
suprana transaction-history      # Show transaction history
```

## Environment Variables

- `SUPRANA_NETWORK` - Network URL (default: http://localhost:8899)
- `SUPRANA_CONFIG_DIR` - Config directory (default: ~/.config/suprana/cli)

## Suplet Wallet

The Suplet wallet Chrome extension supports Suprana network:

1. Load Suplet extension in Chrome
2. Network will default to localhost (Suprana)
3. All balances shown in SUP
4. Send/receive SUP tokens

## Directory Structure

```
suprana/
├── bin/
│   ├── suprana                    # CLI tool
│   ├── suprana-test-validator     # Test validator
│   └── suprana-keygen            # Keypair generator
├── config/                        # Configuration files
├── ledger/                        # Validator ledger data
└── README.md
```

## Network Features

- **Branding**: Suprana blockchain
- **Token**: SUP (10 billion total supply)
- **Decimals**: 9 (1 SUP = 1,000,000,000 lamports)
- **Block Time**: ~200ms
- **Consensus**: Proof of History (PoH) + Proof of Stake (PoS)

## Support

For issues and questions, please refer to the main documentation.
