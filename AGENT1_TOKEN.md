# Agent1 Token - Created on Suprana

## Token Information

**Name**: Agent1
**Symbol**: AGENT1
**Network**: Suprana (localhost)
**Total Supply**: 1,000,000,000 (1 Billion)
**Decimals**: 9

## Contract Details

| Property | Value |
|----------|-------|
| **Token Mint Address** | `JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7` |
| **Token Program** | `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA` |
| **Mint Authority** | `2HFN1uTK3VC7qw7dErSpgkYos2Yj2xt94twmKrS14Ym6` |
| **Freeze Authority** | (not set) |
| **Supply** | 1,000,000,000.000000000 |

## Token Holder

| Owner Address | Token Account | Balance |
|---------------|---------------|---------|
| `3LoqVoc1pHr1cz2STjRfouNi5zAFKvz5CkbG9LgrKhAm` | `67hY6kfXHzruMMFZfoK1TgBhizD44xE2xXJcEpPJEMfF` | 1,000,000,000 AGENT1 |

## Creation Transactions

### Token Mint Creation
- **Signature**: `51hir4JsHiKmXVHegdRg1SZXsmJHPmTD9NCvaWVWTiK1i1xZVZmbYMoJxsDJGwpFyE6rYB5CC1HP7fsYBqcersPr`
- **Status**: Confirmed ✅

### Token Account Creation
- **Signature**: `2JkKayp8UHssfa38y2SGSep5TDAnV96mBRCxPdUPpam9zo3esG1Jp3UryEPzPzogjmrH3gpn8J3S2dBM9U6KRwtg`
- **Status**: Confirmed ✅

### Token Minting
- **Signature**: `3FujNxdeCAj9ikeLnBLYWgb5UHk9Tta7zqrZg91EzUZQZoZbpGvbsk1g8186nFDCC4XG75MifLJ9ux4bpwoXeaJa`
- **Amount**: 1,000,000,000 AGENT1
- **Status**: Confirmed ✅

## CLI Commands

### Check Balance
```bash
spl-token balance JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7 \
  --owner 3LoqVoc1pHr1cz2STjRfouNi5zAFKvz5CkbG9LgrKhAm \
  --url http://localhost:8899
```

### Display Token Info
```bash
spl-token display JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7 \
  --url http://localhost:8899
```

### Check Supply
```bash
spl-token supply JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7 \
  --url http://localhost:8899
```

### List Token Accounts
```bash
spl-token accounts --owner 3LoqVoc1pHr1cz2STjRfouNi5zAFKvz5CkbG9LgrKhAm \
  --url http://localhost:8899
```

### Transfer Tokens
```bash
spl-token transfer JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7 \
  <AMOUNT> <RECIPIENT_ADDRESS> \
  --owner ~/.config/solana/id.json \
  --url http://localhost:8899
```

## Token Economics

- **Total Supply**: 1,000,000,000 AGENT1
- **Circulating Supply**: 1,000,000,000 AGENT1 (100%)
- **Initial Distribution**: 100% to `3LoqVoc1pHr1cz2STjRfouNi5zAFKvz5CkbG9LgrKhAm`
- **Decimals**: 9 (same as SUP/SOL)
- **Smallest Unit**: 0.000000001 AGENT1

## Integration

### Add to PAILET Wallet

To add Agent1 token to PAILET wallet, you would need to:

1. Add SPL token support to the wallet
2. Import token by mint address: `JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7`
3. Token will show balance for connected wallet

### Create Token Account (for new users)

```bash
spl-token create-account JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7 \
  --url http://localhost:8899
```

## Technical Details

### Token Standard
- **Standard**: SPL Token (Solana Program Library)
- **Compatible with**: All Solana/Suprana wallets and DApps
- **Network**: Suprana testnet (localhost:8899)

### Smart Contract
- **Program ID**: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
- **Type**: SPL Token
- **Upgradeable**: No (standard token program)

### Security Features
- ✅ Fixed supply (1B tokens minted)
- ✅ No freeze authority (tokens cannot be frozen)
- ✅ Mint authority retained (can mint more if needed)
- ✅ Standard SPL token program (audited)

## Use Cases

The Agent1 token can be used for:
- Governance within the Suprana ecosystem
- Trading on DEXes
- Liquidity provision
- Rewards and incentives
- Agent-based operations

## Status

✅ **Token Created**: Successfully
✅ **Supply Minted**: 1,000,000,000 AGENT1
✅ **Network**: Suprana (localhost)
✅ **Holder**: 3LoqVoc1pHr1cz2STjRfouNi5zAFKvz5CkbG9LgrKhAm
✅ **Balance Verified**: 1B AGENT1

## Quick Reference

```
Token Name:    Agent1
Symbol:        AGENT1
Mint Address:  JCNVw8JmDsW6kRpwu9fRzQXhLHzXsdehAp6nVWM8Wrd7
Supply:        1,000,000,000
Decimals:      9
Network:       Suprana (http://localhost:8899)
Holder:        3LoqVoc1pHr1cz2STjRfouNi5zAFKvz5CkbG9LgrKhAm
```

---

**Created**: 2025-11-21
**Network**: Suprana Testnet
**Status**: Active ✅
