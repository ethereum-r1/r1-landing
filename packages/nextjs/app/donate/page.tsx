"use client";

import { useEffect, useState } from "react";
import { Address, createPublicClient, http, parseEther } from "viem";
import { mainnet, sepolia } from "viem/chains";
import { useAccount, useWriteContract } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import EthDonations from "~~/contracts/EthDonations.json";

const Donate = () => {
  const [donations, setDonations] = useState<
    { eth_amount: string; from_address: string; from_name: string; tx_hash: string }[]
  >([]);
  const [totalDonations, setTotalDonations] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const { writeContractAsync } = useWriteContract();

  const DONATION_ADDRESS_SEPOLIA = "0xA2126FF93Fb4D07ffa498b90558B08bE4CC7be01";
  const DONATION_ADDRESS_MAINNET = "0xE610E35d7C5a46384587da5125d63578993FD6D7";
  const TARGET_CHAIN = process.env.NEXT_PUBLIC_ENVIRONMENT === "development" ? sepolia : mainnet;
  const END_TIMESTAMP = 1756763999;
  const { address: connectedAddress, isConnected, chain } = useAccount();
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDonationAmount(value);
    setIsSuccess(false);
    setIsError(false);
    setIsPending(false);
    setTxHash("");

    // Validate the input is a valid number
    if (value === "") {
      setAmountError("");
    } else if (!/^(\d+)?(\.\d+)?$/.test(value)) {
      setAmountError("Please enter a valid number");
    } else if (parseFloat(value) <= 0) {
      setAmountError("Amount must be greater than 0");
    } else {
      setAmountError("");
    }
  };

  const handleReturnDonation = async () => {
    if (!isConnected  || amountError) return;

    try {
      setIsPending(true);
      // Convert the ETH amount to wei

      // Create a client for the current network
      const client = createPublicClient({
        chain: TARGET_CHAIN === sepolia ? sepolia : mainnet,
        transport: http(),
      });
      // Prepare the contract call
      const { request } = await client.simulateContract({
        address: TARGET_CHAIN === sepolia ? DONATION_ADDRESS_SEPOLIA : (DONATION_ADDRESS_MAINNET as Address),
        abi: EthDonations.abi,
        functionName: "returnDonation",
        account: connectedAddress,
      });

      const hash = await writeContractAsync(request);
      console.log("donation hash", hash);
      // Clear input after successful transaction
      // The data parameter is the transaction hash
      setTxHash(hash);
      setIsPending(false);
      setIsSuccess(true);
      // const receipt = await client.waitForTransactionReceipt({ hash });
    } catch (error) {
      console.error("Error sending donation:", error);
      setAmountError("Failed to send transaction. Please try again.");
      setIsPending(false);
      setIsSuccess(false);
      setIsError(true);
    }
  };

  const fetchDonations = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setIsLoading(true);
    }
    try {
      // for dev: fetch("/api/donations")
      const response1 = await fetch("https://0000000000.org/donations");
      if (!response1.ok) {
        throw new Error("Failed to fetch donations");
      }
      const donations = await response1.json();

      // NOTE: removed becase now all transfers were donated
      // // for dev: fetch("/api/transfers")
      // const response2 = await fetch("https://0000000000.org/transfers");
      // if (!response2.ok) {
      //   throw new Error("Failed to fetch donations");
      // }
      // const donations2 = await response2.json();

      // const donations = [...donations1, ...donations2];

      // Calculate total donations
      const totalDonations = donations.reduce((sum: number, donation: any) => {
        return sum + parseFloat(donation.eth_amount);
      }, 0);
      setTotalDonations(totalDonations);

      // Combine donations from the same address
      const donationsByAddress = new Map<
        string,
        {
          eth_amount: number;
          from_address: string;
          from_name: string;
          tx_hash: string;
        }
      >();

      for (const donation of donations) {
        const amount = parseFloat(donation.eth_amount);
        if (donationsByAddress.has(donation.from_address)) {
          const existing = donationsByAddress.get(donation.from_address)!;
          existing.eth_amount += amount;
        } else {
          donationsByAddress.set(donation.from_address, {
            eth_amount: amount,
            from_address: donation.from_address,
            from_name: donation.from_name,
            tx_hash: donation.tx_hash,
          });
        }
      }

      // Convert back to array and convert amounts to strings
      const combinedDonations = Array.from(donationsByAddress.values()).map(donation => ({
        ...donation,
        eth_amount: donation.eth_amount.toString(),
      }));

      // Clean up trailing zeros
      for (const donation of combinedDonations) {
        donation.eth_amount = donation.eth_amount.replace(/\.?0+$/, "");
      }

      // Sort donations by amount in descending order
      const sortedDonations = combinedDonations.sort((a, b) => {
        return parseFloat(b.eth_amount) - parseFloat(a.eth_amount);
      });

      // Truncate amounts and handle small values
      for (const donation of sortedDonations) {
        donation.eth_amount = donation.eth_amount.substring(0, 7);
        if (donation.eth_amount === "0.00000") {
          donation.eth_amount = "<0.00001";
        }
      }

      setDonations(sortedDonations);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    // Initial load
    fetchDonations(true);

    // Set up interval for background updates
    const interval = setInterval(() => {
      fetchDonations(false);
    }, 15000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-start bg-[white] w-full max-w-5xl mx-auto py-0 px-0 sm:px-5"
      style={{ lineHeight: "140%" }}
    >
      <div className="flex w-full justify-center" /*style={{ gap: '80px' }}*/>
        <div className="w-full pt-2 sm:w-[430px]">
          <h1 className="text-black  font-normal leading-none mb-4">Ethereum R1 was powered by you.</h1>
          <p className="text-black  font-normal mb-6">
          Reclaim your donation below from the smart contract on Ethereum Mainnet.
          </p>
          <div className="mb-6">
            <div className="mt-4">
              {!isConnected ? (
                <div className="w-full">
                  <RainbowKitCustomConnectButton buttonText="Connect to Claim Donation" />
                </div>
              ) : (
                <button
                  onClick={handleReturnDonation}
                  disabled={!isConnected || isPending || TARGET_CHAIN != chain}
                  className="btn btn-primary shadow-none btn-sm min-w-[180px]"
                >
                  {TARGET_CHAIN != chain ? "Wrong Network" : isPending ? "Confirming..." : "Reclaim Your Donation"}
                </button>
              )}
              {isPending && <div className="text-blue-500  mt-2">Tx pending...</div>}
              {isSuccess && (
                <div className="text-green-500  mt-2">
                  Tx submitted!{" "}
                  <a
                    href={
                      TARGET_CHAIN === sepolia
                        ? `https://sepolia.etherscan.io/tx/${txHash}`
                        : `https://etherscan.io/tx/${txHash}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-500 underline transition-all hover:scale-105"
                  >
                    link
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="inline-block ml-1"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              )}
              {isError && <div className="text-red-500  mt-2">Tx failed. Please try again.</div>}
            </div>
          </div>
          
          <p className="text-black  font-normal mb-4">
          Dear Ethereum Community,
          </p>
          <p className="text-black  font-normal mb-4">
          Ethereum R1 was powered by you. Thank you for your generous donations to our smart contract on Ethereum Mainnet.
This project existed thanks to the generosity of the Ethereum community. There’s no token, no foundation, no VC, just ETH from those who believe public infrastructure should remain public.
Unfortunately, we didn’t achieve our goal of 1000 ETH, so we are now refunding all donations. We are grateful for your belief in us and thank you for your support.
          </p>
          
         <p className="text-black  font-normal mb-4">
         The funds are still in the smart contract and can be claimed through our claim UI now or directly on Etherscan.
         How to Claim Your Refund on Etherscan:
         </p>
         <p className="text-black  font-normal mb-4 overflow-x-hidden" >
         <b>1.  Go to the donation contract on Etherscan: <a href="https://etherscan.io/address/0xe610e35d7c5a46384587da5125d63578993fd6d7#writeContract" target="_blank" rel="noopener noreferrer" className="text-black underline">https://etherscan.io/0xe6...d6d7#writeContract </a></b>
         </p>
         <p className="text-black  font-normal mb-4">
         <b>2.  Connect your wallet (Click “Connect to Web3”).</b>
         </p>
         <p className="text-black  font-normal mb-4">
         <b>3.  Click “Write” on the returnDonation() method.</b>
         </p>
         <p className="text-black  font-normal mb-4">
         To check if your wallet has a donation, use the Read methods and query donations ({"<your address>"}).
         </p>
         <p className="text-black  font-normal mb-4">
         Below, we list all donors (by amount) with deep gratitude. Your support wasn’t just funding code, it was backing a future where rollups stay credibly neutral.
         </p>

         <div className="block w-full border-b-2 border-black border-dotted"></div>
          <br></br>
          {
            <div className="font-mono text-black mb-8">
              
              <div className="text-sm mt-1">
                {totalDonations >= 1000 ? "1000" : totalDonations.toFixed(2)} / 1000 ETH received. </div>
            </div>
          }
          <div className="flex flex-col w-full">
            <div className="flex w-full items-center">
              <div className="w-1/2 text-black ">Donation Address</div>
              <div className="w-1/2 flex justify-end items-center gap-2">
                <button
                  onClick={() => fetchDonations(true)}
                  disabled={isLoading}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
                  </svg>
                </button>
                <div className="text-black  text-right">Amount (ETH)</div>
              </div>
            </div>
            {isLoading ? (
              <div className="text-black ">Loading donations...</div>
            ) : (
              donations.map((donation, index) => (
                <div key={index}>
                  <div className="flex w-full pt-1">
                    <div className="w-3/4 text-black text-[10px]">{`${index + 1}. ${donation.from_name}`}</div>
                    <div className="w-1/4 text-black  text-right">{donation.eth_amount}</div>
                  </div>
                  <div className="block w-full border-b-2 border-black border-dotted"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
