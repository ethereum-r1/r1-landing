# R1 UI

A scaffold-eth-2 project configured with Foundry for smart contract development, focusing on the Ethereum mainnet and Sepolia testnet.

## Getting Started

### Prerequisites

- Node.js (>=18.17.0)
- Yarn (>=1.22.0)
- [Foundry](https://getfoundry.sh/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/kassandraoftroy/r1-ui.git
cd r1-ui
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env.local` file in the `packages/nextjs` directory:

```bash
cp packages/nextjs/.env.example packages/nextjs/.env.local
```

4. Create a `.env` file in the `packages/foundry` directory:

```bash
cp packages/foundry/.env.example packages/foundry/.env
```

5. Add your environment variables in both `.env` files:

## Network Configuration

This project is configured to work with:

- Ethereum Mainnet
- Sepolia Testnet

The hardhat local network has been removed from the configuration. 

### Environment Variables

In your `packages/nextjs/.env.local` file, add the following:

```
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_api_key
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
NEXT_PUBLIC_ETHEREUM_RPC_URL=your_ethereum_mainnet_rpc_url
NEXT_PUBLIC_SEPOLIA_RPC_URL=your_sepolia_testnet_rpc_url
```

In your `packages/foundry/.env` file, add:

```
DEPLOYER_PRIVATE_KEY=your_private_key
SEPOLIA_RPC_URL=your_sepolia_testnet_rpc_url
MAINNET_RPC_URL=your_ethereum_mainnet_rpc_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Development

To run the development server:

```bash
yarn start
```

To compile and test the smart contracts:

```bash
cd packages/foundry
forge build
forge test
```

To deploy your contracts to Sepolia testnet:

```bash
cd packages/foundry
forge script script/Deploy.s.sol --rpc-url $SEPOLIA_RPC_URL --broadcast --verify -vvvv
```

## License

This project is licensed under the MIT License.