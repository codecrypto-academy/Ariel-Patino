# ETH Database Document - dApp

Decentralized document verification system using blockchain.

## Features

- **Document Upload**: Upload and hash documents using SHA-256
- **Digital Signatures**: Sign documents with MetaMask
- **Blockchain Storage**: Store document hashes and signatures on Ethereum
- **Document Verification**: Verify document authenticity
- **History Tracking**: View all stored documents

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Ethers.js** - Blockchain interaction
- **Wagmi** - React hooks for Ethereum
- **MetaMask** - Wallet integration

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension
- Git

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd dapp
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Contract Configuration
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourContractAddressHere
NEXT_PUBLIC_RPC_URL=https://sepolia.gateway.tenderly.co
NEXT_PUBLIC_CHAIN_ID=11155111

# App Configuration
NEXT_PUBLIC_APP_NAME=ETH Database Document
NEXT_PUBLIC_APP_DESCRIPTION=Document verification dApp

# WalletConnect Configuration
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id

# Alchemy Configuration (optional)
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
```

## Usage

### 1. Connect Wallet
- Click "Connect MetaMask" to connect your wallet
- Ensure you're on the correct network (Sepolia testnet for testing)

### 2. Upload Document
- Go to the "Upload Document" tab
- Drag and drop or select a file
- The system will automatically calculate the SHA-256 hash

### 3. Sign Document
- Click "Sign with MetaMask" to sign the document hash
- Confirm the transaction in MetaMask
- Click "Store on Blockchain" to save to the smart contract

### 4. Verify Document
- Go to the "Verify Document" tab
- Upload the original document
- Enter the signer's address
- Click "Verify Document" to check authenticity

### 5. View History
- Go to the "Document History" tab
- View all stored documents
- Click on any document to see details

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run component tests
npm run test:components
```

## Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deployment

The dApp can be deployed to any static hosting service:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **IPFS**

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Smart Contract Integration

The dApp integrates with the `DocumentRegistry` smart contract:

- **Store Documents**: `storeDocumentHash(hash, timestamp, signature)`
- **Verify Documents**: `verifyDocument(hash, signer, signature)`
- **Get Document Info**: `getDocumentInfo(hash)`
- **Check Existence**: `isDocumentStored(hash)`

## Security Considerations

- All file processing happens in the browser
- Private keys never leave MetaMask
- Signatures are verified on-chain
- Document hashes are immutable once stored

## Troubleshooting

### MetaMask Connection Issues
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network
- Try refreshing the page and reconnecting

### Transaction Failures
- Ensure you have enough ETH for gas fees
- Check that the contract is deployed on the current network
- Verify the contract address is correct

### File Upload Issues
- Check file size limits (recommended: < 10MB)
- Ensure file format is supported
- Try refreshing the page

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

MIT License - see LICENSE file for details.