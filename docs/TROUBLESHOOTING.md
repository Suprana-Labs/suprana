# Troubleshooting Guide

Common issues and solutions for Suprana.

## Installation Issues

### Rust Installation Fails

**Problem**: `curl: command not found` or permission errors

**Solution**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install curl build-essential

# macOS
xcode-select --install

# Then retry Rust installation
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Suprana CLI Not Found

**Problem**: `suprana: command not found`

**Solution**:
```bash
# Add to PATH
export PATH="$HOME/suprana/bin:$PATH"

# Make permanent (add to ~/.bashrc or ~/.zshrc)
echo 'export PATH="$HOME/suprana/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Verify
suprana --version
```

## Network Issues

### Cannot Connect to Validator

**Problem**: `Connection refused` or timeout errors

**Solution**:
```bash
# Check if validator is running
ps aux | grep suprana-test-validator

# Check port availability
lsof -i :8899

# Restart validator
pkill -f suprana-test-validator
suprana-test-validator &

# Verify connection
curl -X POST http://localhost:8899 -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"getHealth"}'
```

### RPC Rate Limiting

**Problem**: `429 Too Many Requests`

**Solution**:
```bash
# Add delays between requests
await new Promise(resolve => setTimeout(resolve, 100));

# Use multiple RPC endpoints
const endpoints = [
    'https://api.suprana.network',
    'https://api-backup.suprana.network'
];

# Implement retry logic with exponential backoff
```

## Wallet Issues

### Insufficient Funds

**Problem**: Transaction fails with insufficient balance

**Solution**:
```bash
# Check balance
suprana balance

# Request airdrop (testnet/localhost)
suprana airdrop 10

# Verify balance
suprana balance

# Check if account exists
suprana account <YOUR_ADDRESS>
```

### Wrong Keypair Path

**Problem**: `Error: Unable to load keypair`

**Solution**:
```bash
# Check keypair location
ls -la ~/.config/suprana/cli/id.json

# Verify keypair
suprana-keygen pubkey ~/.config/suprana/cli/id.json

# Set correct path
suprana config set --keypair ~/.config/suprana/cli/id.json

# Or specify explicitly
suprana balance --keypair ~/path/to/wallet.json
```

### Lost Private Key

**Problem**: Cannot access wallet

**Solution**:
```bash
# If you have seed phrase:
suprana-keygen recover

# If completely lost:
# Unfortunately, funds cannot be recovered without the private key or seed phrase
# This is by design for security
# Always backup your keys!
```

## Transaction Issues

### Transaction Failed

**Problem**: Transaction shows as failed

**Solution**:
```bash
# Get transaction details
suprana confirm <SIGNATURE>

# Check logs for error
suprana logs <SIGNATURE>

# Common errors:
# - Insufficient balance: Add more SUP
# - Invalid instruction: Check program compatibility
# - Blockhash expired: Retry with fresh blockhash
```

### Blockhash Expired

**Problem**: `Blockhash not found` error

**Solution**:
```typescript
// Get fresh blockhash before sending
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

transaction.recentBlockhash = blockhash;

// Send with confirmation
const signature = await connection.sendTransaction(transaction, [signer]);

// Confirm with height awareness
await connection.confirmTransaction({
    signature,
    blockhash,
    lastValidBlockHeight
});
```

### Transaction Timeout

**Problem**: Transaction confirmation times out

**Solution**:
```bash
# Check network status
suprana cluster-version

# Use different commitment level
suprana confirm <SIGNATURE> --commitment processed

# Check if transaction was actually processed
suprana transaction-history <YOUR_ADDRESS> | grep <SIGNATURE>

# Retry if needed (ensure idempotency)
```

## Validator Issues

### Validator Won't Start

**Problem**: Validator crashes on startup

**Solution**:
```bash
# Check logs
tail -f ~/suprana/validator.log

# Remove corrupted ledger
rm -rf ~/suprana/ledger
suprana-test-validator --reset

# Check disk space
df -h

# Check system resources
free -h
top
```

### Validator Not Catching Up

**Problem**: Validator behind network

**Solution**:
```bash
# Check catchup status
suprana catchup <VALIDATOR_IDENTITY>

# Increase system limits
ulimit -n 1000000

# Check network bandwidth
speedtest-cli

# Consider snapshot download
suprana-validator download-snapshot

# Check system resources
htop
iostat -x 1
```

### High Memory Usage

**Problem**: Validator using too much RAM

**Solution**:
```bash
# Limit ledger size
suprana-test-validator --limit-ledger-size 50000000

# Add swap space
sudo fallocate -l 32G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Monitor memory
watch -n 1 free -h
```

## Program/Smart Contract Issues

### Program Build Fails

**Problem**: `cargo build-bpf` fails

**Solution**:
```bash
# Update Rust
rustup update

# Clean build
cargo clean
anchor clean

# Reinstall BPF tools
solana-install init

# Check Rust version
rustc --version  # Should be 1.70+

# Try building with verbose output
cargo build-bpf --verbose
```

### Program Deploy Fails

**Problem**: Insufficient funds or deployment errors

**Solution**:
```bash
# Check balance (need ~2-5 SUP for deployment)
suprana balance

# Check program size
ls -lh target/deploy/my_program.so

# Deploy with higher commitment
suprana program deploy target/deploy/my_program.so \
    --commitment finalized

# If program too large
# Optimize with release profile in Cargo.toml:
# [profile.release]
# opt-level = 3
# lto = true
```

### Program Execution Error

**Problem**: Custom program errors

**Solution**:
```bash
# View transaction logs
suprana logs <SIGNATURE>

# Common errors:
# - "custom program error: 0x1": Check error codes in program
# - "Program failed to complete": Check compute units
# - "Access violation": Check account permissions

# Increase compute units in transaction
transaction.add(
    ComputeBudgetProgram.setComputeUnitLimit({
        units: 400000
    })
);
```

## Token Issues

### Token Account Not Found

**Problem**: Cannot find token account

**Solution**:
```bash
# Create associated token account
spl-token create-account <TOKEN_MINT>

# Or in code (auto-create):
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
);
```

### Token Transfer Fails

**Problem**: Transfer fails with various errors

**Solution**:
```bash
# Check token account balance
spl-token balance <TOKEN_MINT>

# Check account ownership
spl-token account-info <TOKEN_ACCOUNT>

# Check if account is frozen
spl-token display <TOKEN_MINT>

# Ensure sufficient SOL for rent
suprana balance
```

### Cannot Mint Tokens

**Problem**: Minting fails

**Solution**:
```bash
# Check mint authority
spl-token display <TOKEN_MINT>

# Ensure you're using correct authority keypair
spl-token mint <TOKEN_MINT> 100 \
    --mint-authority ~/mint-authority.json

# Check if minting is disabled
# If "mint authority: (disabled)", cannot mint more
```

## Build/Development Issues

### Anchor Build Errors

**Problem**: Anchor fails to build

**Solution**:
```bash
# Update Anchor
avm install latest
avm use latest

# Clean build
anchor clean
rm -rf target/

# Update dependencies
cargo update

# Check Anchor.toml configuration
cat Anchor.toml

# Verify program ID matches
anchor keys list
```

### TypeScript Type Errors

**Problem**: Type errors in tests

**Solution**:
```bash
# Generate types
anchor build

# Update @coral-xyz/anchor
npm install @coral-xyz/anchor@latest

# Check tsconfig.json
cat tsconfig.json

# Regenerate types
anchor idl build
```

### Node Modules Issues

**Problem**: NPM dependency conflicts

**Solution**:
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm cache clean --force

# Reinstall
npm install

# Or use yarn
yarn install

# Update packages
npm update
```

## Performance Issues

### Slow Transaction Confirmation

**Problem**: Transactions take too long

**Solution**:
```bash
# Use 'processed' commitment for faster confirmation
connection = new Connection(url, 'processed');

# Increase RPC timeout
connection = new Connection(url, {
    commitment: 'confirmed',
    confirmTransactionInitialTimeout: 60000
});

# Use websocket for faster updates
connection.onAccountChange(pubkey, callback);
```

### High RPC Latency

**Problem**: Slow API responses

**Solution**:
```bash
# Use geographically closer RPC
# Test latency:
ping api.suprana.network

# Use custom RPC with load balancing
# Implement caching for frequently accessed data
```

## Common Error Messages

### "Blockhash not found"
**Cause**: Blockhash expired (150 blocks ~ 1 minute)
**Fix**: Get fresh blockhash and retry

### "insufficient funds for rent"
**Cause**: Not enough lamports for rent exemption
**Fix**: Add more SUP to account

### "custom program error: 0x0"
**Cause**: Program-specific error
**Fix**: Check program logs with `suprana logs`

### "Transaction simulation failed"
**Cause**: Transaction would fail on-chain
**Fix**: Review account states and permissions

### "Account does not exist"
**Cause**: Account not initialized
**Fix**: Initialize account first or check address

## Getting Help

### Enable Verbose Logging

```bash
# CLI verbose mode
suprana --verbose balance

# Enable debug logs
export RUST_LOG=debug
suprana-test-validator

# JavaScript/TypeScript
console.log(JSON.stringify(transaction, null, 2));
```

### Collect Diagnostic Information

```bash
# System info
uname -a
suprana --version
rustc --version

# Network status
suprana cluster-version
suprana epoch-info

# Account info
suprana balance
suprana account <ADDRESS>

# Transaction details
suprana confirm <SIGNATURE>
suprana logs <SIGNATURE>
```

### Community Resources

- **GitHub Issues**: https://github.com/Suprana-Labs/suprana/issues
- **Discord**: Coming soon
- **Documentation**: https://docs.suprana.network

## Preventive Measures

### Always Backup Keys

```bash
# Backup wallet
cp ~/.config/suprana/cli/id.json ~/backup/wallet-backup-$(date +%Y%m%d).json

# Store backup offline securely
# Never share private keys!
```

### Test on Localhost First

```bash
# Always test locally before mainnet
suprana-test-validator &
# Run your tests
anchor test
```

### Use Version Control

```bash
# Track your code
git init
git add .
git commit -m "Initial commit"

# Use .gitignore to exclude sensitive files
echo "*.json" >> .gitignore  # Exclude keypairs
echo "target/" >> .gitignore
```

### Monitor Resources

```bash
# Set up monitoring
watch -n 5 'suprana balance && suprana epoch-info'

# Monitor system resources
htop
```

---

**Still having issues?** Open an issue on GitHub or ask in Discord.
