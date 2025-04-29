import { useEffect, useMemo } from "react";
import * as chains from "viem/chains";
import { useAccount } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { useGlobalState } from "~~/services/store/store";
import { ChainWithAttributes } from "~~/utils/scaffold-eth";
import { NETWORKS_EXTRA_DATA } from "~~/utils/scaffold-eth";

/**
 * Retrieves the connected wallet's network from scaffold.config or defaults to Ethereum mainnet if the wallet is not connected.
 */
export function useTargetNetwork(): { targetNetwork: ChainWithAttributes } {
  const { chain } = useAccount();
  const targetNetwork = useGlobalState(({ targetNetwork }) => targetNetwork);
  const setTargetNetwork = useGlobalState(({ setTargetNetwork }) => setTargetNetwork);

  useEffect(() => {
    // If connected to a wallet, use that network if it's in our target networks
    if (chain?.id) {
      const newSelectedNetwork = scaffoldConfig.targetNetworks.find(targetNetwork => targetNetwork.id === chain.id);
      if (newSelectedNetwork && newSelectedNetwork.id !== targetNetwork.id) {
        setTargetNetwork(newSelectedNetwork);
      }
    } 
    // If no network is selected or the selected network is not in target networks, default to the first network in targetNetworks
    else if (!targetNetwork || !scaffoldConfig.targetNetworks.some(n => n.id === targetNetwork.id)) {
      // Default to the first network in the targetNetworks array (Sepolia in dev, Mainnet in prod)
      const defaultNetwork = scaffoldConfig.targetNetworks[0];
      if (defaultNetwork) {
        setTargetNetwork(defaultNetwork);
      }
    }
  }, [chain?.id, setTargetNetwork, targetNetwork]);

  return useMemo(
    () => ({
      targetNetwork: {
        ...targetNetwork,
        ...NETWORKS_EXTRA_DATA[targetNetwork.id],
      },
    }),
    [targetNetwork],
  );
}
