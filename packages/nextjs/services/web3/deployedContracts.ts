/**
 * This file contains the deployed contract addresses for each network.
 * It's used to connect to the correct contract addresses based on the network the app is running on.
 */

import * as chains from "viem/chains";
import { Address } from "viem";

/**
 * Smart contract addresses for each network.
 * Update this file when you deploy contracts to a new network or change contract addresses.
 */
export const deployedContracts = {
  [chains.mainnet.id]: {
    YourContract: {
      address: "0x0000000000000000000000000000000000000000" as Address,
      abi: [], // Add the ABI here once deployed
    },
  },
  [chains.sepolia.id]: {
    YourContract: {
      address: "0x0000000000000000000000000000000000000000" as Address,
      abi: [], // Add the ABI here once deployed
    },
  },
} as const;

export type DeployedContracts = typeof deployedContracts;