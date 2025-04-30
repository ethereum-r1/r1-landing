# R1 Landing

A simple landing page for the ethereum r1 project

## Getting Started

### Prerequisites

- Node.js (>=18.17.0)
- Yarn (>=1.22.0)
- [Foundry](https://getfoundry.sh/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ethereum-r1/r1-landing.git
cd r1-landing
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env.local` file in the `packages/nextjs` directory:

```bash
cp packages/nextjs/.env.example packages/nextjs/.env.local
```

4. Add your environment variables. 

### Environment Variables

In your `packages/nextjs/.env.local` file, add the following:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_ETHEREUM_RPC_URL=your_ethereum_mainnet_rpc_url
NEXT_PUBLIC_SEPOLIA_RPC_URL=your_sepolia_testnet_rpc_url
```

## Development

To run the development server:

```bash
yarn start
```

## Export to IPFS

run this

```
chmod +x build-ipfs.sh
./build-ipfs.sh
```

## License

This project is licensed under the MIT License.