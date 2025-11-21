# Token Creation Guide

Complete guide to creating and managing SPL tokens on Suprana.

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installing SPL Token CLI](#installing-spl-token-cli)
- [Creating a Token](#creating-a-token)
- [Token Accounts](#token-accounts)
- [Minting Tokens](#minting-tokens)
- [Token Metadata](#token-metadata)
- [Token Extensions](#token-extensions)
- [Advanced Features](#advanced-features)

## Overview

Suprana supports SPL (Suprana Program Library) tokens, which are the token standard for the Suprana blockchain. You can create:

- **Fungible Tokens**: Standard tokens with decimal precision
- **Non-Fungible Tokens (NFTs)**: Unique tokens with supply of 1
- **Semi-Fungible Tokens**: Limited supply collectibles
- **Tokens with Extensions**: Advanced features like transfer fees, confidential transfers

## Prerequisites

### Required Software

```bash
# Suprana CLI installed and configured
suprana --version

# Rust and Cargo installed
cargo --version

# Wallet with SUP for transaction fees
suprana balance  # Should have at least 1 SUP
```

### Setup

```bash
# Configure network (localhost for testing)
export SUPRANA_NETWORK="http://localhost:8899"

# Start test validator (if testing locally)
suprana-test-validator &

# Airdrop SUP for fees
suprana airdrop 10
```

## Installing SPL Token CLI

### Method 1: Install from Crates.io

```bash
# Install spl-token CLI
cargo install spl-token-cli

# Verify installation
spl-token --version
```

### Method 2: Build from Source

```bash
# Clone repository
git clone https://github.com/solana-labs/solana-program-library.git
cd solana-program-library/token/cli

# Build and install
cargo install --path .

# Verify
spl-token --version
```

### Configure SPL Token CLI

```bash
# The spl-token CLI uses the same config as suprana CLI
# It will automatically use your default keypair

# Check configuration
spl-token config
```

## Creating a Token

### Basic Token Creation

```bash
# Create a new token
spl-token create-token

# Output example:
# Creating token AbC123...xyz789
# Signature: 5j7s...8fKp
# Token: AbC123...xyz789

# Save the token address
export TOKEN_ADDRESS="AbC123...xyz789"
```

### Token with Decimals

```bash
# Create token with 6 decimals (like USDC)
spl-token create-token --decimals 6

# Create token with 0 decimals (for NFTs)
spl-token create-token --decimals 0
```

### Token with Custom Mint Authority

```bash
# Generate a keypair for mint authority
suprana-keygen new --outfile mint-authority.json

# Create token with custom mint authority
spl-token create-token mint-authority.json

# This keypair will be required to mint new tokens
```

### Viewing Token Information

```bash
# Get token supply
spl-token supply $TOKEN_ADDRESS

# Get all information about a token
spl-token display $TOKEN_ADDRESS
```

## Token Accounts

### Creating Token Accounts

```bash
# Create a token account for your wallet
spl-token create-account $TOKEN_ADDRESS

# Output:
# Creating account 8x4a...92jK
# Signature: 3mW2...7vFp

export TOKEN_ACCOUNT="8x4a...92jK"
```

### Associated Token Accounts (Recommended)

```bash
# Associated Token Accounts (ATA) use a deterministic address
# derived from wallet address + token mint

# ATAs are automatically created when needed, but you can create manually:
spl-token create-account $TOKEN_ADDRESS --owner <WALLET_ADDRESS>
```

### Viewing Token Accounts

```bash
# List all token accounts for your wallet
spl-token accounts

# Get balance of specific token
spl-token balance $TOKEN_ADDRESS

# Get account info
spl-token account-info $TOKEN_ACCOUNT
```

## Minting Tokens

### Mint to Your Account

```bash
# Mint 1000 tokens
spl-token mint $TOKEN_ADDRESS 1000

# Mint to specific account
spl-token mint $TOKEN_ADDRESS 1000 $TOKEN_ACCOUNT

# Check balance
spl-token balance $TOKEN_ADDRESS
```

### Mint to Another Address

```bash
# Create token account for recipient first
RECIPIENT="<RECIPIENT_WALLET_ADDRESS>"

# Mint directly to recipient (will create ATA automatically)
spl-token mint $TOKEN_ADDRESS 500 -- $RECIPIENT
```

### Fixed Supply Tokens

```bash
# 1. Create token
TOKEN=$(spl-token create-token --decimals 6 | grep "Creating token" | awk '{print $3}')

# 2. Create account
spl-token create-account $TOKEN

# 3. Mint total supply (e.g., 1,000,000 tokens)
spl-token mint $TOKEN 1000000

# 4. Disable future minting by removing mint authority
spl-token authorize $TOKEN mint --disable

# Now the supply is fixed forever!
```

## Token Metadata

### Using Metaplex Token Metadata

Token metadata includes name, symbol, description, and image.

#### Install Metaplex CLI

```bash
# Install Sugar CLI for metadata management
bash <(curl -sSf https://sugar.metaplex.com/install.sh)

# Verify installation
sugar --version
```

#### Create Metadata

```bash
# Create metadata.json
cat > metadata.json << EOF
{
  "name": "My Token",
  "symbol": "MYT",
  "description": "My custom token on Suprana",
  "image": "https://example.com/token-logo.png",
  "external_url": "https://example.com",
  "attributes": [],
  "properties": {
    "files": [
      {
        "uri": "https://example.com/token-logo.png",
        "type": "image/png"
      }
    ],
    "category": "currency"
  }
}
EOF

# Upload metadata (you'll need a storage solution)
# For testing, you can use a file hosting service
```

#### Add Metadata to Token

Using TypeScript/JavaScript:

```typescript
import { createCreateMetadataAccountV3Instruction } from '@metaplex-foundation/mpl-token-metadata';
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
const mintAddress = new PublicKey('YOUR_TOKEN_ADDRESS');
const metadataUri = 'https://example.com/metadata.json';

// Create metadata account
const metadataAccount = await createMetadataAccount({
  connection,
  mint: mintAddress,
  name: 'My Token',
  symbol: 'MYT',
  uri: metadataUri,
  sellerFeeBasisPoints: 0,
  creators: null,
  collection: null,
  uses: null,
});
```

## Token Extensions

Token-2022 program supports extensions:

### Transfer Fee

```bash
# Create token with transfer fee
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --transfer-fee-basis-points 50 \
  --transfer-fee-max-amount 1000000

# 50 basis points = 0.5% fee
# Max fee capped at 1,000,000 base units
```

### Interest-Bearing Tokens

```bash
# Create token with interest rate
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --interest-rate 50

# Interest rate in basis points (50 = 0.5% APY)
```

### Confidential Transfers

```bash
# Create token with confidential transfer support
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-confidential-transfers auto
```

### Non-Transferable Tokens (Soulbound)

```bash
# Create non-transferable token
spl-token create-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb \
  --enable-non-transferable
```

## Advanced Features

### Multisig Mint Authority

```bash
# Create multisig
spl-token create-multisig 2 <PUBKEY1> <PUBKEY2> <PUBKEY3>
# Requires 2 of 3 signatures

# Create token with multisig mint authority
spl-token create-token --mint-authority <MULTISIG_ADDRESS>

# Minting requires multiple signatures
spl-token mint $TOKEN_ADDRESS 1000 --multisig-signer signer1.json --multisig-signer signer2.json
```

### Freezing Token Accounts

```bash
# Create token with freeze authority
spl-token create-token --enable-freeze

# Freeze an account (prevents transfers)
spl-token freeze $TOKEN_ACCOUNT

# Thaw (unfreeze) an account
spl-token thaw $TOKEN_ACCOUNT
```

### Burning Tokens

```bash
# Burn (destroy) tokens from your account
spl-token burn $TOKEN_ACCOUNT 100

# Burned tokens are removed from supply permanently
```

### Closing Token Accounts

```bash
# Close empty token account and recover rent
spl-token close $TOKEN_ACCOUNT

# Close account and send remaining tokens to another address
spl-token close $TOKEN_ACCOUNT --recipient <RECIPIENT_ADDRESS>
```

### Transferring Tokens

```bash
# Transfer tokens to another wallet
spl-token transfer $TOKEN_ADDRESS 100 <RECIPIENT_ADDRESS>

# Transfer with explicit source and destination accounts
spl-token transfer $TOKEN_ADDRESS 100 <RECIPIENT_ADDRESS> \
  --from $SOURCE_ACCOUNT \
  --fund-recipient  # Create recipient account if needed
```

### Authority Management

```bash
# View current authorities
spl-token display $TOKEN_ADDRESS

# Transfer mint authority to another address
spl-token authorize $TOKEN_ADDRESS mint <NEW_AUTHORITY>

# Transfer freeze authority
spl-token authorize $TOKEN_ADDRESS freeze <NEW_AUTHORITY>

# Disable mint authority (makes supply fixed)
spl-token authorize $TOKEN_ADDRESS mint --disable

# Disable freeze authority (makes token non-freezable)
spl-token authorize $TOKEN_ADDRESS freeze --disable
```

## Complete Example: Creating a Custom Token

```bash
#!/bin/bash
# create-custom-token.sh

# Configuration
TOKEN_NAME="My Project Token"
TOKEN_SYMBOL="MPT"
DECIMALS=9
TOTAL_SUPPLY=1000000000  # 1 billion

echo "Creating token: $TOKEN_NAME ($TOKEN_SYMBOL)"

# 1. Create token
echo "Step 1: Creating token..."
TOKEN=$(spl-token create-token --decimals $DECIMALS | grep "Creating token" | awk '{print $3}')
echo "Token created: $TOKEN"

# 2. Create token account
echo "Step 2: Creating token account..."
spl-token create-account $TOKEN
ACCOUNT=$(spl-token accounts --token $TOKEN | grep "Token" | awk '{print $1}')
echo "Token account: $ACCOUNT"

# 3. Mint total supply
echo "Step 3: Minting $TOTAL_SUPPLY tokens..."
spl-token mint $TOKEN $TOTAL_SUPPLY

# 4. Verify supply
SUPPLY=$(spl-token supply $TOKEN)
echo "Current supply: $SUPPLY"

# 5. (Optional) Disable minting to fix supply
read -p "Disable minting to fix supply? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    spl-token authorize $TOKEN mint --disable
    echo "Minting disabled - supply is now fixed!"
fi

echo ""
echo "Token creation complete!"
echo "========================"
echo "Token Address: $TOKEN"
echo "Token Account: $ACCOUNT"
echo "Supply: $TOTAL_SUPPLY"
echo ""
echo "Save these addresses!"
```

## Programmatic Token Creation

### Using TypeScript/JavaScript

```typescript
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  MINT_SIZE,
  getMinimumBalanceForRentExemptMint,
} from '@solana/spl-token';

const connection = new Connection('http://localhost:8899', 'confirmed');
const payer = Keypair.generate(); // Your wallet keypair

// Create a new token
async function createToken() {
  const mint = await createMint(
    connection,
    payer,                    // Payer
    payer.publicKey,          // Mint authority
    payer.publicKey,          // Freeze authority
    9                         // Decimals
  );

  console.log('Token created:', mint.toBase58());
  return mint;
}

// Create token account
async function createTokenAccount(mint: PublicKey, owner: PublicKey) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
  );

  console.log('Token account:', tokenAccount.address.toBase58());
  return tokenAccount;
}

// Mint tokens
async function mintTokens(mint: PublicKey, destination: PublicKey, amount: number) {
  await mintTo(
    connection,
    payer,
    mint,
    destination,
    payer,
    amount * Math.pow(10, 9)  // Adjust for decimals
  );

  console.log(`Minted ${amount} tokens`);
}

// Main execution
async function main() {
  const mint = await createToken();
  const tokenAccount = await createTokenAccount(mint, payer.publicKey);
  await mintTokens(mint, tokenAccount.address, 1000000);
}

main();
```

### Using Rust

```rust
use solana_client::rpc_client::RpcClient;
use solana_sdk::{
    signature::{Keypair, Signer},
    transaction::Transaction,
};
use spl_token::{
    instruction::{initialize_mint, mint_to},
    state::Mint,
};

fn create_token(
    client: &RpcClient,
    payer: &Keypair,
    decimals: u8,
) -> Result<Keypair, Box<dyn std::error::Error>> {
    let mint_account = Keypair::new();

    // Create mint account
    let rent = client.get_minimum_balance_for_rent_exemption(Mint::LEN)?;

    // Create and initialize mint
    let instructions = vec![
        system_instruction::create_account(
            &payer.pubkey(),
            &mint_account.pubkey(),
            rent,
            Mint::LEN as u64,
            &spl_token::id(),
        ),
        initialize_mint(
            &spl_token::id(),
            &mint_account.pubkey(),
            &payer.pubkey(),
            Some(&payer.pubkey()),
            decimals,
        )?,
    ];

    let recent_blockhash = client.get_latest_blockhash()?;
    let transaction = Transaction::new_signed_with_payer(
        &instructions,
        Some(&payer.pubkey()),
        &[payer, &mint_account],
        recent_blockhash,
    );

    client.send_and_confirm_transaction(&transaction)?;

    println!("Token created: {}", mint_account.pubkey());
    Ok(mint_account)
}
```

## Best Practices

1. **Always backup mint authority keypairs**
2. **Test on localhost/testnet first**
3. **Consider disabling mint authority after initial distribution**
4. **Use Associated Token Accounts (ATAs) when possible**
5. **Document your token's contract address and decimals**
6. **Implement proper metadata for discoverability**
7. **Consider security audits for complex token programs**

## Next Steps

- **[Smart Contracts Guide](SMART_CONTRACTS.md)** - Build custom token logic
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Integrate tokens into apps
- **[CLI Reference](CLI_REFERENCE.md)** - Full CLI command reference

---

**Need help?** Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or join our Discord.
