# Suprana Documentation Issues Found During Test Build

**Test Date:** November 24, 2025
**Tester:** Following BUILD_GUIDE.md step-by-step
**System:** macOS (Apple Silicon)

## Critical Findings

### 1. Repository Architecture Confusion

**Issue:** BUILD_GUIDE.md instructs to clone `https://github.com/Suprana-Labs/suprana.git`, but this repository is actually an **archived Solana repository**, not a Suprana-specific fork.

**Details:**
- The cloned README.md states: "# PLEASE READ: This repo is now a public archive"
- This is the original solana-labs/solana repository that has been archived
- Suprana is achieved through wrapper scripts that rebrand Solana → Suprana
- This approach should be clearly documented upfront

**Recommended Fix:** BUILD_GUIDE.md should clarify:
```markdown
## Architecture Note

Suprana is built on Solana's proven blockchain technology. The build process:
1. Clones the Solana source code (archived version)
2. Builds standard Solana binaries
3. Creates Suprana wrapper scripts that rebrand the binaries and outputs

This approach leverages Solana's stability while providing Suprana-specific branding.
```

### 2. README.md Incorrect Block Time

**File:** `/Users/yousefhosseini/Dropbox/PAI/Pai2v3compact/testnet/suprana/README.md`

**Issues:**
- **Line 10:** States `Block Time: ~400ms` should be `~200ms`
- **Line 123:** States `Block Time: ~400ms` should be `~200ms`

**Impact:** Users will have incorrect performance expectations

**Fix Required:** Replace all instances of "400ms" with "200ms"

### 3. README.md Incorrect Wallet Name

**File:** `/Users/yousefhosseini/Dropbox/PAI/Pai2v3compact/testnet/suprana/README.md`

**Issues:**
- **Line 96:** Section header says "PAILET Wallet" should be "Suplet Wallet"
- **Line 98:** Text says "The PAILET wallet" should be "The Suplet wallet"

**Impact:** Outdated branding, confuses users about wallet name

**Fix Required:** Replace all instances of "PAILET" with "Suplet"

## BUILD_GUIDE.md Issues

### 4. Missing Dependency Installation Emphasis

**Issue:** BUILD_GUIDE.md lists cmake and protobuf as dependencies but doesn't emphasize they must be installed BEFORE attempting the build.

**What Happened:**
- Dependencies listed in section but not installed initially
- Had to install: `brew install cmake protobuf`
- These were NOT pre-installed on the test system

**Recommended Fix:** Add a clear prerequisite check section:
```markdown
## Prerequisites Check

Before cloning the repository, verify all dependencies are installed:

```bash
# Check Rust
rustc --version  # Should be 1.70.0+
cargo --version

# Check build tools
clang --version
cmake --version
protoc --version
git --version

# If cmake or protoc missing on macOS:
brew install cmake protobuf
```
```

### 5. Binary Name Inconsistencies

**File:** `BUILD_GUIDE.md`

**Issues:**
- Lines 152, 164, 374-379: Still reference "solana*" binary names
- Should clarify that Solana binaries are built first, then Suprana wrappers are created

**Example from line 152:**
```bash
ls -lh target/release/solana*  # Should explain these become Suprana via wrappers
```

### 6. Build Time Estimate

**BUILD_GUIDE.md Line 148:** States build takes "15-30 minutes"

**Status:** Currently testing on Apple Silicon M-series Mac
- Build started: 00:33:31 AEDT
- Status: In progress (dependency fetching phase)
- Will update with actual time upon completion

## Dependency Installation Log

**Required Installations:**
1. ✅ Rust 1.85.0 (pre-installed, project requires 1.76.0 via rust-toolchain.toml)
2. ✅ Clang (Apple clang 16.0.0 - pre-installed with Xcode)
3. ❌ **CMake** - Had to install: `brew install cmake` → v4.2.0
4. ❌ **Protobuf** - Had to install: `brew install protobuf` → v33.1
5. ✅ Git 2.39.5 (pre-installed)

**Observation:** CMake and Protobuf were NOT pre-installed and required manual installation before build could proceed.

## Positive Observations

1. ✅ Rust version auto-detection via `rust-toolchain.toml` works perfectly
2. ✅ Repository structure is well-organized
3. ✅ Dependencies install cleanly via Homebrew
4. ✅ Build process starts smoothly after dependencies are installed

## Test Environment

- **OS:** macOS Darwin 24.0.0
- **Architecture:** Apple Silicon (aarch64)
- **Rust:** 1.85.0 (stable), auto-switched to 1.76.0 via rust-toolchain.toml
- **Test Directory:** `~/PAI/Suprana-Test-Net/Node2`
- **Build Started:** November 24, 2025 00:33:31 AEDT
- **Build Status:** In progress...

## Next Steps

1. ✅ Monitor build completion and record actual build time
2. ⬜ Test Suprana wrapper scripts creation
3. ⬜ Test validator functionality
4. ⬜ Verify all documentation fixes
5. ⬜ Clean and rebuild to verify repeatability

---

*This document will be updated as the test build progresses.*

## BUILD TIME - CRITICAL FINDING

**BUILD_GUIDE.md states:** 15-30 minutes
**ACTUAL BUILD TIME:** 538 minutes (8 hours 58 minutes)

**Test Environment:**
- System: Apple Silicon (ARM64 M-series)
- OS: macOS Darwin 24.0.0
- Rust: 1.76.0 (project-specified)
- Build Type: Release (--release flag)
- Started: November 24, 2025 00:33:31 AEDT
- Completed: November 24, 2025 09:32:00 AEDT

**Discrepancy:** Actual time is **35x longer** than documented estimate!

**Recommendation:** BUILD_GUIDE.md should clarify:
- Intel/AMD x86_64: ~15-30 minutes
- Apple Silicon (ARM64): ~8-10 hours (due to cross-compilation)
- Consider providing pre-built binaries for ARM64 macOS
