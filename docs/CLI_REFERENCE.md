# CLI Reference

Complete command-line reference for Suprana.

## Table of Contents
- [Global Options](#global-options)
- [Configuration](#configuration)
- [Wallet Management](#wallet-management)
- [Transfers](#transfers)
- [Validators](#validators)
- [Programs](#programs)
- [Staking](#staking)
- [Vote Accounts](#vote-accounts)

## Global Options

Available for all commands:

```bash
--config <PATH>              # Config file path (default: ~/.config/suprana/cli/config.yml)
--url <URL>                  # RPC URL
--keypair <PATH>             # Wallet keypair path
--commitment <LEVEL>         # Commitment level (processed|confirmed|finalized)
--verbose                    # Verbose output
--output <FORMAT>            # Output format (json|json-compact)
--help                       # Show help
--version                    # Show version
```

## Configuration

### suprana config

```bash
# View current configuration
suprana config get

# Set RPC URL
suprana config set --url http://localhost:8899
suprana config set --url https://api.mainnet.suprana.network

# Set default keypair
suprana config set --keypair ~/.config/suprana/cli/id.json

# Set commitment level
suprana config set --commitment confirmed
```

## Wallet Management

### suprana-keygen

```bash
# Generate new keypair
suprana-keygen new
suprana-keygen new --outfile ~/my-wallet.json
suprana-keygen new --no-passphrase

# Generate with seed phrase
suprana-keygen new --derivation-path m/44'/501'/0'/0'

# Recover from seed phrase
suprana-keygen recover
suprana-keygen recover --outfile recovered-wallet.json

# Display public key
suprana-keygen pubkey ~/my-wallet.json

# Verify keypair
suprana-keygen verify <PUBKEY> ~/my-wallet.json

# Generate grind keypair (vanity address)
suprana-keygen grind --starts-with abc:1
```

### suprana address

```bash
# Show your address
suprana address

# Show address from specific keypair
suprana address --keypair ~/my-wallet.json
```

### suprana balance

```bash
# Check your balance
suprana balance

# Check another address balance
suprana balance <ADDRESS>

# Show balance in lamports
suprana balance --lamports
```

### suprana airdrop

```bash
# Request airdrop (testnet/localhost only)
suprana airdrop 10
suprana airdrop 5 <ADDRESS>
```

## Transfers

### suprana transfer

```bash
# Transfer SUP
suprana transfer <RECIPIENT> 10
suprana transfer <RECIPIENT> 10 --from ~/sender-wallet.json

# Transfer with fee payer
suprana transfer <RECIPIENT> 10 --fee-payer ~/fee-payer.json

# Allow unfunded recipient
suprana transfer <RECIPIENT> 10 --allow-unfunded-recipient

# Transfer from specific wallet
suprana transfer <RECIPIENT> 10 --from ~/my-wallet.json

# Transfer all SUP
suprana transfer <RECIPIENT> ALL

# Offline signing
suprana transfer --sign-only <RECIPIENT> 10 > unsigned.json
suprana transfer --blockhash <HASH> --signer signature.json <RECIPIENT> 10
```

### suprana account

```bash
# View account details
suprana account <ADDRESS>

# Show lamports
suprana account <ADDRESS> --lamports

# Show data as JSON
suprana account <ADDRESS> --output json
```

## Cluster Information

### suprana cluster-version

```bash
# Get cluster version
suprana cluster-version
```

### suprana slot

```bash
# Get current slot
suprana slot

# Get slot with commitment
suprana slot --commitment finalized
```

### suprana block-height

```bash
# Get block height
suprana block-height
```

### suprana block-time

```bash
# Get block time
suprana block-time <SLOT>
```

### suprana epoch-info

```bash
# Get epoch information
suprana epoch-info

# JSON output
suprana epoch-info --output json
```

### suprana genesis-hash

```bash
# Get genesis hash
suprana genesis-hash
```

### suprana transaction-history

```bash
# Show transaction history
suprana transaction-history <ADDRESS>

# Limit results
suprana transaction-history <ADDRESS> --limit 10

# Show before signature
suprana transaction-history <ADDRESS> --before <SIGNATURE>
```

### suprana confirm

```bash
# Confirm transaction
suprana confirm <SIGNATURE>

# With specific commitment
suprana confirm <SIGNATURE> --commitment finalized
```

## Validators

### suprana validators

```bash
# List all validators
suprana validators

# Show delinquent validators
suprana validators --delinquent

# JSON output
suprana validators --output json
```

### suprana validator-info

```bash
# Get validator info
suprana validator-info get <VALIDATOR_IDENTITY>

# Publish validator info
suprana validator-info publish \
    --keypair ~/validator-keypair.json \
    "Validator Name" \
    --website https://example.com \
    --details "Validator description"
```

### suprana catchup

```bash
# Check validator catchup status
suprana catchup <VALIDATOR_IDENTITY>

# Follow catchup progress
suprana catchup <VALIDATOR_IDENTITY> --follow
```

### suprana gossip

```bash
# View gossip network
suprana gossip
```

### suprana leader-schedule

```bash
# View leader schedule
suprana leader-schedule

# For specific epoch
suprana leader-schedule --epoch 100
```

## Programs

### suprana program

```bash
# Deploy program
suprana program deploy /path/to/program.so

# Show program info
suprana program show <PROGRAM_ID>

# Dump program data
suprana program dump <PROGRAM_ID> program-dump.bin

# Close program and recover rent
suprana program close <PROGRAM_ID>

# Set upgrade authority
suprana program set-upgrade-authority <PROGRAM_ID> \
    --new-upgrade-authority <NEW_AUTHORITY>

# Make program immutable
suprana program set-upgrade-authority <PROGRAM_ID> --final

# Extend program size
suprana program extend <PROGRAM_ID> 10000
```

### suprana program deploy

```bash
# Deploy with specific program ID
suprana program deploy program.so --program-id <KEYPAIR>

# Deploy with upgrade authority
suprana program deploy program.so \
    --upgrade-authority ~/authority.json

# Max retries
suprana program deploy program.so --max-len 100000
```

## Staking

### suprana create-stake-account

```bash
# Create stake account
suprana create-stake-account ~/stake-account.json 100

# With specific stake authority
suprana create-stake-account ~/stake-account.json 100 \
    --stake-authority ~/stake-authority.json \
    --withdraw-authority ~/withdraw-authority.json

# With seed
suprana create-stake-account ~/stake-account.json 100 \
    --seed myseed
```

### suprana delegate-stake

```bash
# Delegate stake to validator
suprana delegate-stake ~/stake-account.json <VOTE_ACCOUNT>

# With specific stake authority
suprana delegate-stake ~/stake-account.json <VOTE_ACCOUNT> \
    --stake-authority ~/stake-authority.json
```

### suprana deactivate-stake

```bash
# Deactivate stake
suprana deactivate-stake ~/stake-account.json

# With authority
suprana deactivate-stake ~/stake-account.json \
    --stake-authority ~/stake-authority.json
```

### suprana withdraw-stake

```bash
# Withdraw from stake account
suprana withdraw-stake ~/stake-account.json <RECIPIENT> 50

# With authority
suprana withdraw-stake ~/stake-account.json <RECIPIENT> 50 \
    --withdraw-authority ~/withdraw-authority.json

# Withdraw all
suprana withdraw-stake ~/stake-account.json <RECIPIENT> ALL
```

### suprana stake-account

```bash
# View stake account
suprana stake-account <STAKE_ACCOUNT>

# JSON output
suprana stake-account <STAKE_ACCOUNT> --output json

# Show lamports
suprana stake-account <STAKE_ACCOUNT> --lamports
```

### suprana stake-history

```bash
# View stake history
suprana stake-history

# Limit entries
suprana stake-history --limit 20
```

## Vote Accounts

### suprana create-vote-account

```bash
# Create vote account
suprana create-vote-account \
    ~/vote-account.json \
    ~/validator-keypair.json \
    ~/authorized-withdrawer.json \
    --commission 10

# With specific node identity
suprana create-vote-account \
    ~/vote-account.json \
    ~/validator-keypair.json \
    ~/authorized-withdrawer.json
```

### suprana vote-account

```bash
# View vote account
suprana vote-account <VOTE_ACCOUNT>

# Show with-rewards
suprana vote-account <VOTE_ACCOUNT> --with-rewards

# JSON output
suprana vote-account <VOTE_ACCOUNT> --output json
```

### suprana vote-update-validator

```bash
# Update validator identity
suprana vote-update-validator \
    ~/vote-account.json \
    ~/new-validator-identity.json \
    ~/authorized-voter.json
```

### suprana vote-update-commission

```bash
# Update commission
suprana vote-update-commission \
    ~/vote-account.json \
    5 \
    ~/authorized-withdrawer.json
```

### suprana vote-authorize-voter

```bash
# Authorize new voter
suprana vote-authorize-voter \
    ~/vote-account.json \
    ~/authorized-voter.json \
    ~/new-authorized-voter.json
```

### suprana withdraw-from-vote-account

```bash
# Withdraw from vote account
suprana withdraw-from-vote-account \
    ~/vote-account.json \
    <RECIPIENT> \
    10 \
    --authorized-withdrawer ~/withdrawer.json
```

## Token Commands (SPL Token)

### spl-token

```bash
# Create token
spl-token create-token

# Create token with decimals
spl-token create-token --decimals 6

# Create token account
spl-token create-account <TOKEN_MINT>

# Mint tokens
spl-token mint <TOKEN_MINT> 1000

# Transfer tokens
spl-token transfer <TOKEN_MINT> 100 <RECIPIENT>

# Burn tokens
spl-token burn <TOKEN_ACCOUNT> 50

# Display token info
spl-token display <TOKEN_MINT>

# Show token balance
spl-token balance <TOKEN_MINT>

# List all token accounts
spl-token accounts

# Close token account
spl-token close <TOKEN_ACCOUNT>

# Authorize
spl-token authorize <TOKEN_MINT> mint <NEW_AUTHORITY>
spl-token authorize <TOKEN_MINT> mint --disable
```

## Advanced Commands

### suprana logs

```bash
# Stream transaction logs
suprana logs

# Filter by program
suprana logs --program <PROGRAM_ID>

# Show specific transaction
suprana logs <SIGNATURE>
```

### suprana block

```bash
# Get block info
suprana block <SLOT>

# Show transactions
suprana block <SLOT> --output json
```

### suprana transaction-count

```bash
# Get transaction count
suprana transaction-count
```

### suprana ping

```bash
# Ping cluster
suprana ping

# Count pings
suprana ping --count 10

# Specific interval
suprana ping --interval 5
```

### suprana live-slots

```bash
# Monitor slots
suprana live-slots
```

### suprana block-production

```bash
# View block production
suprana block-production

# For specific epoch
suprana block-production --epoch 100
```

## Environment Variables

```bash
# Config directory
SUPRANA_CONFIG_DIR="${HOME}/.config/suprana/cli"

# Network URL
SUPRANA_NETWORK="http://localhost:8899"

# Config file
SUPRANA_CONFIG_FILE="${SUPRANA_CONFIG_DIR}/config.yml"
```

## Common Workflows

### Setup New Wallet

```bash
suprana-keygen new
suprana config set --keypair ~/.config/suprana/cli/id.json
suprana airdrop 10
suprana balance
```

### Transfer Tokens

```bash
suprana balance
suprana transfer <RECIPIENT> 5
suprana confirm <SIGNATURE>
```

### Deploy Program

```bash
anchor build
suprana program deploy target/deploy/my_program.so
suprana program show <PROGRAM_ID>
```

### Create and Delegate Stake

```bash
suprana create-stake-account ~/stake.json 100
suprana delegate-stake ~/stake.json <VOTE_ACCOUNT>
suprana stake-account ~/stake.json
```

---

**More Commands**: Run `suprana --help` or `suprana <subcommand> --help` for detailed help.
