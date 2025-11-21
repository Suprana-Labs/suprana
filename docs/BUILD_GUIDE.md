# Suprana Build Guide

Complete guide to building Suprana from source code.

## Table of Contents
- [Prerequisites](#prerequisites)
- [System Requirements](#system-requirements)
- [Installing Dependencies](#installing-dependencies)
- [Building from Source](#building-from-source)
- [Building CLI Tools](#building-cli-tools)
- [Cross-Platform Builds](#cross-platform-builds)
- [Verification](#verification)

## Prerequisites

### Required Software

#### Rust Toolchain
```bash
# Install Rust (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Update Rust to latest version
rustup update stable

# Verify installation
rustc --version  # Should be 1.70.0 or later
cargo --version
```

#### C/C++ Compiler
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install build-essential pkg-config libssl-dev libudev-dev

# macOS
xcode-select --install

# Fedora/RHEL
sudo dnf install gcc gcc-c++ make openssl-devel systemd-devel
```

#### Additional Dependencies
```bash
# Ubuntu/Debian
sudo apt install git clang cmake protobuf-compiler

# macOS (using Homebrew)
brew install git cmake protobuf

# Fedora/RHEL
sudo dnf install git clang cmake protobuf-compiler
```

## System Requirements

### Minimum Requirements
- **CPU**: 4 cores
- **RAM**: 8GB
- **Disk**: 50GB available space
- **Network**: Stable internet connection

### Recommended for Development
- **CPU**: 8 cores or more
- **RAM**: 16GB or more
- **Disk**: 100GB+ SSD
- **Network**: High-speed internet

### Validator Node Requirements
- **CPU**: 12+ cores / 24+ threads (2.8GHz+)
- **RAM**: 128GB or more
- **Disk**: 2TB+ NVMe SSD
- **Network**: 1 Gbps+ with low latency

## Installing Dependencies

### 1. Install Rust and Cargo

```bash
# Install rustup (Rust installer)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Source the environment
source $HOME/.cargo/env

# Add to shell profile for persistence
echo 'source $HOME/.cargo/env' >> ~/.bashrc  # or ~/.zshrc
```

### 2. Install LLVM and Clang

```bash
# Ubuntu/Debian
sudo apt install llvm clang

# macOS
brew install llvm

# Verify installation
clang --version
```

### 3. Install Protocol Buffers

```bash
# Ubuntu/Debian
sudo apt install protobuf-compiler libprotobuf-dev

# macOS
brew install protobuf

# Verify installation
protoc --version
```

## Building from Source

### 1. Clone the Repository

```bash
# Clone Suprana repository
git clone https://github.com/Suprana-Labs/suprana.git
cd suprana

# Or if building from Solana source:
git clone https://github.com/solana-labs/solana.git suprana-source
cd suprana-source
git checkout v1.17.0  # Use stable version
```

### 2. Configure Build Environment

```bash
# Set Rust toolchain version
rustup default stable

# Install additional components
rustup component add rustfmt clippy

# Set optimization level (optional)
export RUSTFLAGS="-C target-cpu=native"
```

### 3. Build All Components

```bash
# Full build (this will take 15-30 minutes)
cargo build --release

# The binaries will be in target/release/
ls -lh target/release/solana*
```

### 4. Install Built Binaries

```bash
# Install to ~/.local/share/solana/install/active_release/bin/
cargo install --path . --bin solana
cargo install --path . --bin solana-keygen
cargo install --path . --bin solana-test-validator

# Verify installation
solana --version
```

## Building CLI Tools

### Build Specific Components

```bash
# Build only the CLI
cargo build --release --bin solana

# Build only the validator
cargo build --release --bin solana-test-validator

# Build only the keygen tool
cargo build --release --bin solana-keygen

# Build all validators
cargo build --release --bin solana-validator
cargo build --release --bin solana-test-validator
```

### Create Suprana Wrapper Scripts

After building, create the Suprana wrapper scripts:

```bash
# Create bin directory
mkdir -p ~/suprana/bin

# Create suprana CLI wrapper
cat > ~/suprana/bin/suprana << 'EOF'
#!/bin/bash
SUPRANA_CONFIG_DIR="${HOME}/.config/suprana/cli"
SUPRANA_NETWORK="${SUPRANA_NETWORK:-http://localhost:8899}"

mkdir -p "${SUPRANA_CONFIG_DIR}"
export SUPRANA_CONFIG_FILE="${SUPRANA_CONFIG_DIR}/config.yml"

if [ ! -f "${SUPRANA_CONFIG_FILE}" ]; then
    solana config set --url "${SUPRANA_NETWORK}" --config "${SUPRANA_CONFIG_FILE}" > /dev/null 2>&1
fi

solana --config "${SUPRANA_CONFIG_FILE}" "$@" 2>&1 | sed 's/ SOL/ SUP/g; s/SOL/SUP/g; s/Solana/Suprana/g; s/solana/suprana/g'
exit ${PIPESTATUS[0]}
EOF

# Create suprana-keygen wrapper
cat > ~/suprana/bin/suprana-keygen << 'EOF'
#!/bin/bash
SUPRANA_CONFIG_DIR="${HOME}/.config/suprana/cli"
mkdir -p "${SUPRANA_CONFIG_DIR}"

if [ "$1" = "new" ] && [ "$2" = "" ]; then
    solana-keygen new --outfile "${SUPRANA_CONFIG_DIR}/id.json" "${@:2}"
else
    solana-keygen "$@"
fi
EOF

# Create suprana-test-validator wrapper
cat > ~/suprana/bin/suprana-test-validator << 'EOF'
#!/bin/bash
SUPRANA_DIR="$HOME/suprana"
LEDGER_DIR="${SUPRANA_DIR}/ledger"

echo "🚀 Starting Suprana Test Validator"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Network: Suprana Testnet"
echo "Native Token: SUP"
echo "Total Supply: 10000000000 SUP"
echo "Ledger: ${LEDGER_DIR}"
echo "RPC URL: http://localhost:8899"
echo "WebSocket: ws://localhost:8900"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

solana-test-validator --ledger "${LEDGER_DIR}" --reset --quiet "$@"
EOF

# Make scripts executable
chmod +x ~/suprana/bin/suprana
chmod +x ~/suprana/bin/suprana-keygen
chmod +x ~/suprana/bin/suprana-test-validator

# Add to PATH
echo 'export PATH="$HOME/suprana/bin:$PATH"' >> ~/.bashrc  # or ~/.zshrc
source ~/.bashrc
```

## Cross-Platform Builds

### Building for Linux on macOS

```bash
# Install cross-compilation tools
rustup target add x86_64-unknown-linux-gnu

# Build for Linux
cargo build --release --target x86_64-unknown-linux-gnu
```

### Building for macOS (Apple Silicon)

```bash
# Add ARM64 target
rustup target add aarch64-apple-darwin

# Build for Apple Silicon
cargo build --release --target aarch64-apple-darwin
```

### Building for Windows

```bash
# Add Windows target
rustup target add x86_64-pc-windows-gnu

# Build for Windows
cargo build --release --target x86_64-pc-windows-gnu
```

## Build Optimization

### Release Build with Optimizations

```bash
# Maximum optimization (slower build, faster runtime)
RUSTFLAGS="-C target-cpu=native -C opt-level=3" cargo build --release

# Link-time optimization (LTO)
RUSTFLAGS="-C lto=fat" cargo build --release
```

### Debug Build

```bash
# Faster compilation, includes debug symbols
cargo build

# Binaries will be in target/debug/
```

### Profile-Guided Optimization (PGO)

```bash
# Step 1: Build with profiling
RUSTFLAGS="-C profile-generate=/tmp/pgo-data" cargo build --release

# Step 2: Run typical workload to generate profile data
./target/release/solana-test-validator &
# ... run typical operations ...
pkill -f solana-test-validator

# Step 3: Build with profile data
RUSTFLAGS="-C profile-use=/tmp/pgo-data" cargo build --release
```

## Verification

### Test the Build

```bash
# Check version
suprana --version

# Test basic functionality
suprana-keygen new --no-passphrase --silent

# Start test validator
suprana-test-validator &
sleep 5

# Test connection
suprana cluster-version

# Stop validator
pkill -f suprana-test-validator
```

### Run Tests

```bash
# Run all tests
cargo test

# Run specific test suite
cargo test --package solana-runtime

# Run integration tests
cargo test --test integration_tests
```

### Benchmarks

```bash
# Run benchmarks
cargo bench

# Run specific benchmark
cargo bench --bench transaction_bench
```

## Build Artifacts

After a successful build, you'll find:

```
target/release/
├── solana                    # CLI tool
├── solana-keygen            # Key generation
├── solana-test-validator    # Test validator
├── solana-validator         # Production validator
├── solana-gossip            # Gossip tool
├── solana-faucet            # Faucet for airdrops
└── ... (other binaries)
```

## Cleaning Build Artifacts

```bash
# Clean all build artifacts
cargo clean

# Clean only release builds
cargo clean --release

# Clean and rebuild
cargo clean && cargo build --release
```

## Troubleshooting Build Issues

### Out of Memory

```bash
# Reduce parallel jobs
cargo build --release -j 2

# Or use less aggressive optimization
cargo build --release --config profile.release.opt-level=2
```

### Compilation Errors

```bash
# Update dependencies
cargo update

# Clean and rebuild
cargo clean && cargo build --release

# Check Rust version
rustup update stable
```

### Linking Errors

```bash
# Ubuntu/Debian
sudo apt install build-essential pkg-config libssl-dev

# macOS
xcode-select --install

# Update linker
cargo clean && cargo build --release
```

## Next Steps

- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Deploy your built validator
- **[Network Setup](NETWORK_SETUP.md)** - Configure network settings
- **[Developer Guide](DEVELOPER_GUIDE.md)** - Start developing on Suprana

---

**Questions?** Check the [Troubleshooting Guide](TROUBLESHOOTING.md) or open an issue on GitHub.
