# Developer Guide

Get started building applications on Suprana.

## Quick Start

```bash
# Install dependencies
npm install @solana/web3.js @solana/spl-token

# Or with yarn
yarn add @solana/web3.js @solana/spl-token
```

## Connecting to Suprana

### JavaScript/TypeScript

```typescript
import { Connection, clusterApiUrl, PublicKey } from '@solana/web3.js';

// Connect to localhost
const connection = new Connection('http://localhost:8899', 'confirmed');

// Connect to testnet
const connection = new Connection('https://api.testnet.suprana.network', 'confirmed');

// Connect to mainnet
const connection = new Connection('https://api.mainnet.suprana.network', 'confirmed');

// Test connection
const version = await connection.getVersion();
console.log('Connected to Suprana version:', version);
```

### Python

```python
from solana.rpc.api import Client

# Connect to localhost
client = Client("http://localhost:8899")

# Get balance
balance = client.get_balance("YOUR_PUBKEY_HERE")
print(f"Balance: {balance['result']['value']} lamports")
```

### Rust

```rust
use solana_client::rpc_client::RpcClient;
use solana_sdk::commitment_config::CommitmentConfig;

fn main() {
    let rpc_url = "http://localhost:8899".to_string();
    let client = RpcClient::new_with_commitment(rpc_url, CommitmentConfig::confirmed());

    let version = client.get_version().unwrap();
    println!("Connected: {:?}", version);
}
```

## Working with Wallets

### Generate Keypair

```typescript
import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';

// Generate new keypair
const keypair = Keypair.generate();

console.log('Public Key:', keypair.publicKey.toBase58());

// Save to file
fs.writeFileSync(
    'wallet.json',
    JSON.stringify(Array.from(keypair.secretKey))
);

// Load from file
const loadedKeypair = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync('wallet.json', 'utf-8')))
);
```

### Get Balance

```typescript
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
const publicKey = new PublicKey('YOUR_ADDRESS');

const balance = await connection.getBalance(publicKey);
console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SUP`);
```

### Request Airdrop

```typescript
// Request 1 SUP airdrop
const signature = await connection.requestAirdrop(
    publicKey,
    1 * LAMPORTS_PER_SOL
);

// Wait for confirmation
await connection.confirmTransaction(signature);
console.log('Airdrop confirmed');
```

## Sending Transactions

### Basic Transfer

```typescript
import {
    Connection,
    Keypair,
    SystemProgram,
    Transaction,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
const fromKeypair = Keypair.fromSecretKey(/* your secret key */);
const toPublicKey = new PublicKey('RECIPIENT_ADDRESS');

// Create transfer instruction
const transaction = new Transaction().add(
    SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: 0.5 * LAMPORTS_PER_SOL
    })
);

// Send and confirm
const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [fromKeypair]
);

console.log('Transaction confirmed:', signature);
```

### With Recent Blockhash

```typescript
// Get recent blockhash
const { blockhash } = await connection.getLatestBlockhash();

const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: fromKeypair.publicKey
}).add(
    SystemProgram.transfer({
        fromPubkey: fromKeypair.publicKey,
        toPubkey: toPublicKey,
        lamports: 0.1 * LAMPORTS_PER_SOL
    })
);

// Sign
transaction.sign(fromKeypair);

// Send
const signature = await connection.sendRawTransaction(
    transaction.serialize()
);

// Confirm
await connection.confirmTransaction(signature);
```

## Working with Tokens

### Create Token

```typescript
import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';

// Create new token
const mint = await createMint(
    connection,
    payer,
    mintAuthority.publicKey,
    freezeAuthority.publicKey,
    9 // decimals
);

console.log('Token created:', mint.toBase58());
```

### Create Token Account

```typescript
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner.publicKey
);

console.log('Token Account:', tokenAccount.address.toBase58());
```

### Mint Tokens

```typescript
await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    mintAuthority,
    1000 * Math.pow(10, 9) // Amount with decimals
);
```

### Transfer Tokens

```typescript
import { transfer } from '@solana/spl-token';

await transfer(
    connection,
    payer,
    sourceTokenAccount,
    destinationTokenAccount,
    owner,
    100 * Math.pow(10, 9)
);
```

## Interacting with Programs

### Call Program Instruction

```typescript
import { TransactionInstruction } from '@solana/web3.js';

const instruction = new TransactionInstruction({
    keys: [
        { pubkey: account1, isSigner: false, isWritable: true },
        { pubkey: account2, isSigner: true, isWritable: false },
    ],
    programId: new PublicKey('YOUR_PROGRAM_ID'),
    data: Buffer.from([/* instruction data */])
});

const transaction = new Transaction().add(instruction);
const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [signerKeypair]
);
```

### Using Anchor

```typescript
import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';

const provider = anchor.AnchorProvider.env();
anchor.setProvider(provider);

const program = anchor.workspace.MyProgram as Program<MyProgram>;

// Call program method
await program.methods
    .initialize(new anchor.BN(100))
    .accounts({
        myAccount: myAccountPda,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc();
```

## Listening to Events

### Account Changes

```typescript
// Subscribe to account changes
const subscriptionId = connection.onAccountChange(
    publicKey,
    (accountInfo, context) => {
        console.log('Account changed:', accountInfo);
    },
    'confirmed'
);

// Unsubscribe
connection.removeAccountChangeListener(subscriptionId);
```

### Slot Changes

```typescript
connection.onSlotChange((slotInfo) => {
    console.log('New slot:', slotInfo.slot);
});
```

### Program Logs

```typescript
connection.onLogs(
    programId,
    (logs, context) => {
        console.log('Program logs:', logs);
    },
    'confirmed'
);
```

## PDAs (Program Derived Addresses)

```typescript
import { PublicKey } from '@solana/web3.js';

const [pda, bump] = await PublicKey.findProgramAddress(
    [
        Buffer.from('my_seed'),
        userPublicKey.toBuffer(),
    ],
    programId
);

console.log('PDA:', pda.toBase58());
console.log('Bump:', bump);
```

## Best Practices

### Error Handling

```typescript
try {
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [signer]
    );
} catch (error) {
    if (error.message.includes('insufficient funds')) {
        console.error('Insufficient balance');
    } else {
        console.error('Transaction failed:', error);
    }
}
```

### Transaction Confirmation

```typescript
// Wait for finalized confirmation
const latestBlockHash = await connection.getLatestBlockhash();

await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: signature,
}, 'finalized');
```

### Rate Limiting

```typescript
// Add delay between requests
await new Promise(resolve => setTimeout(resolve, 100));

// Use commitment levels appropriately
connection.getBalance(publicKey, 'processed'); // Fastest
connection.getBalance(publicKey, 'confirmed'); // Balanced
connection.getBalance(publicKey, 'finalized'); // Most secure
```

## Complete Example: Token Faucet

```typescript
import {
    Connection,
    Keypair,
    PublicKey,
    Transaction,
    sendAndConfirmTransaction,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import {
    createMint,
    getOrCreateAssociatedTokenAccount,
    mintTo,
    TOKEN_PROGRAM_ID
} from '@solana/spl-token';

class TokenFaucet {
    connection: Connection;
    payer: Keypair;
    mint: PublicKey;

    constructor(connection: Connection, payer: Keypair, mint: PublicKey) {
        this.connection = connection;
        this.payer = payer;
        this.mint = mint;
    }

    async airdrop(recipient: PublicKey, amount: number) {
        // Get or create recipient token account
        const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
            this.connection,
            this.payer,
            this.mint,
            recipient
        );

        // Mint tokens to recipient
        await mintTo(
            this.connection,
            this.payer,
            this.mint,
            recipientTokenAccount.address,
            this.payer,
            amount * Math.pow(10, 9)
        );

        console.log(`Airdropped ${amount} tokens to ${recipient.toBase58()}`);
    }
}

// Usage
const connection = new Connection('http://localhost:8899');
const payer = Keypair.fromSecretKey(/* ... */);
const mint = new PublicKey('YOUR_TOKEN_MINT');

const faucet = new TokenFaucet(connection, payer, mint);
await faucet.airdrop(recipientPublicKey, 100);
```

## Testing

### Local Testing

```typescript
import { Connection, Keypair } from '@solana/web3.js';

describe('My Program Tests', () => {
    let connection: Connection;
    let payer: Keypair;

    before(async () => {
        connection = new Connection('http://localhost:8899', 'confirmed');
        payer = Keypair.generate();

        // Airdrop SUP for testing
        const signature = await connection.requestAirdrop(
            payer.publicKey,
            10 * LAMPORTS_PER_SOL
        );
        await connection.confirmTransaction(signature);
    });

    it('should initialize account', async () => {
        // Test implementation
    });
});
```

## Resources

- **Web3.js Docs**: https://solana-labs.github.io/solana-web3.js/
- **SPL Token Docs**: https://spl.solana.com/token
- **Anchor Docs**: https://www.anchor-lang.com/
- **Suprana Cookbook**: https://solanacookbook.com/

## Next Steps

- **[Token Creation](TOKEN_CREATION.md)** - Create your own tokens
- **[Smart Contracts](SMART_CONTRACTS.md)** - Write on-chain programs
- **[CLI Reference](CLI_REFERENCE.md)** - Command-line tools

---

**Need help?** Join our Discord community!
