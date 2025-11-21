# Smart Contracts Development Guide

Complete guide to developing, deploying, and testing smart contracts (programs) on Suprana.

## Table of Contents
- [Overview](#overview)
- [Development Environment](#development-environment)
- [Program Architecture](#program-architecture)
- [Writing Your First Program](#writing-your-first-program)
- [Testing Programs](#testing-programs)
- [Deploying Programs](#deploying-programs)
- [Advanced Concepts](#advanced-concepts)
- [Security Best Practices](#security-best-practices)

## Overview

Suprana programs (smart contracts) are executable code deployed on-chain written in:
- **Rust** (recommended, most common)
- **C/C++** (via LLVM)
- **Python** (via Seahorse framework)

Programs on Suprana:
- Are stateless (state stored in accounts)
- Execute in the Suprana BPF runtime
- Can call other programs (Cross-Program Invocation)
- Process instructions from transactions

## Development Environment

### Prerequisites

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env

# Install Solana CLI tools
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

# Add to PATH
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"

# Verify installation
rustc --version
cargo --version
suprana --version
```

### Install Anchor Framework (Recommended)

Anchor is the most popular framework for Suprana development:

```bash
# Install Anchor via AVM (Anchor Version Manager)
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
avm install latest
avm use latest

# Verify installation
anchor --version

# Install dependencies
sudo apt-get install -y pkg-config build-essential libudev-dev libssl-dev
```

### Setup Development Workspace

```bash
# Create workspace directory
mkdir ~/suprana-programs
cd ~/suprana-programs

# Initialize new Anchor project
anchor init my_program
cd my_program

# Project structure:
# my_program/
# ├── Anchor.toml          # Anchor configuration
# ├── Cargo.toml           # Rust dependencies
# ├── programs/            # Program source code
# │   └── my_program/
# │       ├── Cargo.toml
# │       └── src/
# │           └── lib.rs
# ├── tests/               # TypeScript tests
# │   └── my_program.ts
# └── migrations/          # Deployment scripts
```

### Configure for Suprana

Edit `Anchor.toml`:

```toml
[features]
seeds = false
skip-lint = false

[programs.localnet]
my_program = "YOUR_PROGRAM_ID"

[registry]
url = "https://api.apr.dev"

[provider]
cluster = "Localnet"
wallet = "~/.config/suprana/cli/id.json"

[scripts]
test = "yarn run ts-mocha -p ./tsconfig.json -t 1000000 tests/**/*.ts"

[test]
startup_wait = 5000

[[test.validator.account]]
address = "YOUR_PROGRAM_ID"
program = "target/deploy/my_program.so"

[test.validator]
url = "http://localhost:8899"
```

## Program Architecture

### Account Model

Suprana programs are stateless. All state lives in accounts:

```rust
use anchor_lang::prelude::*;

#[account]
pub struct MyAccount {
    pub authority: Pubkey,      // 32 bytes
    pub data: u64,              // 8 bytes
    pub bump: u8,               // 1 byte
}

// Account size = 8 (discriminator) + 32 + 8 + 1 = 49 bytes
```

### Program Structure

```rust
use anchor_lang::prelude::*;

// Program ID (generated when building)
declare_id!("YOUR_PROGRAM_ID_HERE");

#[program]
pub mod my_program {
    use super::*;

    // Initialize instruction
    pub fn initialize(ctx: Context<Initialize>, data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.authority = ctx.accounts.authority.key();
        my_account.data = data;
        my_account.bump = *ctx.bumps.get("my_account").unwrap();
        Ok(())
    }

    // Update instruction
    pub fn update(ctx: Context<Update>, new_data: u64) -> Result<()> {
        let my_account = &mut ctx.accounts.my_account;
        my_account.data = new_data;
        Ok(())
    }
}

// Initialize context
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 32 + 8 + 1,
        seeds = [b"my_account", authority.key().as_ref()],
        bump
    )]
    pub my_account: Account<'info, MyAccount>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

// Update context
#[derive(Accounts)]
pub struct Update<'info> {
    #[account(
        mut,
        seeds = [b"my_account", authority.key().as_ref()],
        bump = my_account.bump,
        has_one = authority
    )]
    pub my_account: Account<'info, MyAccount>,
    pub authority: Signer<'info>,
}

// Account structure
#[account]
pub struct MyAccount {
    pub authority: Pubkey,
    pub data: u64,
    pub bump: u8,
}
```

## Writing Your First Program

### Hello World Counter Program

```rust
use anchor_lang::prelude::*;

declare_id!("YOUR_PROGRAM_ID");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        counter.authority = ctx.accounts.user.key();
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        msg!("Counter incremented to: {}", counter.count);
        Ok(())
    }

    pub fn decrement(ctx: Context<Decrement>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = counter.count.checked_sub(1).unwrap();
        msg!("Counter decremented to: {}", counter.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 8 + 32,
        seeds = [b"counter", user.key().as_ref()],
        bump
    )]
    pub counter: Account<'info, Counter>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(
        mut,
        seeds = [b"counter", authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(
        mut,
        seeds = [b"counter", authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    pub counter: Account<'info, Counter>,
    pub authority: Signer<'info>,
}

#[account]
pub struct Counter {
    pub count: u64,
    pub authority: Pubkey,
}
```

### Building the Program

```bash
# Build the program
anchor build

# Get program ID
suprana address -k target/deploy/counter-keypair.json

# Update declare_id! in lib.rs with the program ID
# Update Anchor.toml with the program ID

# Rebuild
anchor build
```

## Testing Programs

### TypeScript Tests

Create `tests/counter.ts`:

```typescript
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import { expect } from "chai";

describe("counter", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Counter as Program<Counter>;
  const user = provider.wallet.publicKey;

  let counterPda: anchor.web3.PublicKey;
  let counterBump: number;

  before(async () => {
    [counterPda, counterBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("counter"), user.toBuffer()],
      program.programId
    );
  });

  it("Initializes the counter", async () => {
    await program.methods
      .initialize()
      .accounts({
        counter: counterPda,
        user: user,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    const counter = await program.account.counter.fetch(counterPda);
    expect(counter.count.toNumber()).to.equal(0);
    expect(counter.authority.toString()).to.equal(user.toString());
  });

  it("Increments the counter", async () => {
    await program.methods
      .increment()
      .accounts({
        counter: counterPda,
        authority: user,
      })
      .rpc();

    const counter = await program.account.counter.fetch(counterPda);
    expect(counter.count.toNumber()).to.equal(1);
  });

  it("Decrements the counter", async () => {
    await program.methods
      .decrement()
      .accounts({
        counter: counterPda,
        authority: user,
      })
      .rpc();

    const counter = await program.account.counter.fetch(counterPda);
    expect(counter.count.toNumber()).to.equal(0);
  });
});
```

### Run Tests

```bash
# Start local validator
suprana-test-validator

# Run tests
anchor test --skip-local-validator

# Or run tests with automatic validator startup
anchor test
```

### Rust Unit Tests

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_counter_logic() {
        let mut counter = Counter {
            count: 0,
            authority: Pubkey::new_unique(),
        };

        // Test increment
        counter.count += 1;
        assert_eq!(counter.count, 1);

        // Test decrement
        counter.count = counter.count.checked_sub(1).unwrap();
        assert_eq!(counter.count, 0);
    }
}
```

## Deploying Programs

### Deploy to Localhost

```bash
# Start test validator
suprana-test-validator

# Deploy program
anchor deploy

# Verify deployment
suprana program show <PROGRAM_ID>
```

### Deploy to Testnet

```bash
# Configure for testnet
suprana config set --url https://api.testnet.suprana.network

# Airdrop SUP for deployment fees
suprana airdrop 10

# Deploy
anchor deploy --provider.cluster testnet

# Verify
suprana program show <PROGRAM_ID> --url https://api.testnet.suprana.network
```

### Deploy to Mainnet

```bash
# Configure for mainnet
suprana config set --url https://api.mainnet.suprana.network

# Ensure sufficient SUP for deployment
suprana balance

# Deploy (requires significant SUP for rent)
anchor deploy --provider.cluster mainnet

# Verify deployment
suprana program show <PROGRAM_ID> --url https://api.mainnet.suprana.network
```

### Upgrade Programs

```bash
# Programs are upgradeable by default
# Rebuild with changes
anchor build

# Deploy upgrade
anchor upgrade target/deploy/my_program.so --program-id <PROGRAM_ID>

# Make program immutable (cannot be upgraded)
suprana program set-upgrade-authority <PROGRAM_ID> --final
```

## Advanced Concepts

### Cross-Program Invocation (CPI)

```rust
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};

pub fn transfer_tokens(ctx: Context<TransferTokens>, amount: u64) -> Result<()> {
    let cpi_accounts = Transfer {
        from: ctx.accounts.from.to_account_info(),
        to: ctx.accounts.to.to_account_info(),
        authority: ctx.accounts.authority.to_account_info(),
    };

    let cpi_program = ctx.accounts.token_program.to_account_info();
    let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);

    token::transfer(cpi_ctx, amount)?;
    Ok(())
}
```

### Program Derived Addresses (PDAs)

```rust
// Find PDA
let (pda, bump) = Pubkey::find_program_address(
    &[b"my_seed", user.key().as_ref()],
    program_id
);

// Sign with PDA
let seeds = &[
    b"my_seed",
    user.key().as_ref(),
    &[bump]
];
let signer_seeds = &[&seeds[..]];

// Use in CPI
let cpi_ctx = CpiContext::new_with_signer(
    cpi_program,
    cpi_accounts,
    signer_seeds
);
```

### Error Handling

```rust
use anchor_lang::prelude::*;

#[program]
pub mod my_program {
    use super::*;

    pub fn guarded_function(ctx: Context<GuardedFunction>, value: u64) -> Result<()> {
        require!(value > 0, MyError::ValueMustBePositive);
        require!(value < 1000, MyError::ValueTooLarge);

        // Process...
        Ok(())
    }
}

#[error_code]
pub enum MyError {
    #[msg("Value must be greater than zero")]
    ValueMustBePositive,

    #[msg("Value must be less than 1000")]
    ValueTooLarge,
}
```

### Events

```rust
#[program]
pub mod my_program {
    use super::*;

    pub fn create_item(ctx: Context<CreateItem>, name: String) -> Result<()> {
        emit!(ItemCreated {
            item: ctx.accounts.item.key(),
            name,
            timestamp: Clock::get()?.unix_timestamp,
        });
        Ok(())
    }
}

#[event]
pub struct ItemCreated {
    pub item: Pubkey,
    pub name: String,
    pub timestamp: i64,
}
```

### Macros and Constraints

```rust
#[derive(Accounts)]
pub struct UpdateData<'info> {
    // Check account is mutable
    #[account(mut)]
    pub data_account: Account<'info, DataAccount>,

    // Check signer authority matches
    #[account(
        constraint = data_account.authority == authority.key() @ MyError::Unauthorized
    )]
    pub authority: Signer<'info>,

    // Check account is owned by specific program
    #[account(
        owner = token::ID
    )]
    pub token_account: Account<'info, TokenAccount>,
}
```

## Security Best Practices

### 1. Validate All Inputs

```rust
pub fn process_value(ctx: Context<Process>, value: u64) -> Result<()> {
    require!(value > 0, MyError::InvalidValue);
    require!(value <= MAX_VALUE, MyError::ValueTooLarge);
    // Process...
    Ok(())
}
```

### 2. Check Account Ownership

```rust
#[derive(Accounts)]
pub struct Secure<'info> {
    #[account(
        constraint = account.owner == program_id @ MyError::InvalidOwner
    )]
    pub account: Account<'info, MyAccount>,
}
```

### 3. Prevent Reentrancy

```rust
#[account]
pub struct State {
    pub locked: bool,
    // other fields...
}

pub fn sensitive_operation(ctx: Context<Sensitive>) -> Result<()> {
    let state = &mut ctx.accounts.state;

    require!(!state.locked, MyError::Reentrancy);
    state.locked = true;

    // Perform operation...

    state.locked = false;
    Ok(())
}
```

### 4. Use Checked Math

```rust
// Bad: Can overflow
let result = value1 + value2;

// Good: Returns error on overflow
let result = value1.checked_add(value2)
    .ok_or(MyError::Overflow)?;
```

### 5. Validate Signers

```rust
#[derive(Accounts)]
pub struct Authorized<'info> {
    #[account(
        has_one = authority @ MyError::Unauthorized
    )]
    pub protected_account: Account<'info, ProtectedAccount>,

    pub authority: Signer<'info>,
}
```

### 6. Audit Program Size

```rust
// Keep account sizes minimal
#[account]
pub struct Optimized {
    pub flag: bool,        // 1 byte, not 8
    pub value: u32,        // 4 bytes if u64 not needed
}
```

## Example: NFT Marketplace

```rust
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("YOUR_PROGRAM_ID");

#[program]
pub mod nft_marketplace {
    use super::*;

    pub fn list_nft(ctx: Context<ListNFT>, price: u64) -> Result<()> {
        let listing = &mut ctx.accounts.listing;
        listing.seller = ctx.accounts.seller.key();
        listing.nft_mint = ctx.accounts.nft_mint.key();
        listing.price = price;
        listing.is_active = true;

        emit!(NFTListed {
            seller: listing.seller,
            nft_mint: listing.nft_mint,
            price,
        });

        Ok(())
    }

    pub fn buy_nft(ctx: Context<BuyNFT>) -> Result<()> {
        let listing = &ctx.accounts.listing;

        require!(listing.is_active, MarketplaceError::ListingNotActive);

        // Transfer payment to seller
        let cpi_accounts = Transfer {
            from: ctx.accounts.buyer_token_account.to_account_info(),
            to: ctx.accounts.seller_token_account.to_account_info(),
            authority: ctx.accounts.buyer.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            cpi_accounts
        );
        token::transfer(cpi_ctx, listing.price)?;

        // Transfer NFT to buyer
        // ... (similar transfer logic for NFT)

        // Close listing
        ctx.accounts.listing.is_active = false;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct ListNFT<'info> {
    #[account(
        init,
        payer = seller,
        space = 8 + 32 + 32 + 8 + 1
    )]
    pub listing: Account<'info, Listing>,

    pub nft_mint: Account<'info, Mint>,

    #[account(mut)]
    pub seller: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Listing {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
    pub is_active: bool,
}

#[event]
pub struct NFTListed {
    pub seller: Pubkey,
    pub nft_mint: Pubkey,
    pub price: u64,
}
```

## Debugging and Tools

### Logging

```rust
msg!("Value: {}", value);
msg!("Account: {}", account.key());
```

### View Logs

```bash
suprana logs <TRANSACTION_SIGNATURE>
```

### Program Testing Tools

```bash
# Anchor test with detailed output
anchor test --skip-deploy -- --nocapture

# BPF loader for testing
cargo test-bpf

# Program size
ls -lh target/deploy/my_program.so
```

## Resources

- **Anchor Documentation**: https://www.anchor-lang.com/
- **Suprana Cookbook**: https://solanacookbook.com/
- **Program Examples**: https://github.com/solana-labs/solana-program-library

## Next Steps

- **[Token Creation Guide](TOKEN_CREATION.md)** - Create custom tokens
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Build full applications
- **[CLI Reference](CLI_REFERENCE.md)** - Command reference

---

**Need help?** Join our Discord or check the troubleshooting guide.
