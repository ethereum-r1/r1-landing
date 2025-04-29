"use client";

import { useEffect, useState } from "react";
import { isAddress, parseEther } from "viem";
import { useAccount, useSendTransaction } from "wagmi";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";

export const Donate = () => {
  const [donations, setDonations] = useState<
    { eth_amount: string; from_address: string; from_name: string; tx_hash: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  const DONATION_ADDRESS = "0xE73EaFBf9061f26Df4f09e08B53c459Df03E2b66";
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending, isSuccess, isError, reset } = useSendTransaction({
    mutation: {
      onSuccess(data) {
        // Clear input after successful transaction
        setDonationAmount("");
        // The data parameter is the transaction hash
        setTxHash(data);
      },
    },
  });

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDonationAmount(value);

    // Reset transaction status when user starts typing again
    if (isPending || isSuccess || isError) {
      reset();
      setTxHash("");
    }

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

  const handleDonate = () => {
    if (!isConnected || !donationAmount || amountError) return;

    try {
      // Convert the ETH amount to wei
      const valueInEth = parseEther(donationAmount);

      // Send the transaction
      sendTransaction({
        to: DONATION_ADDRESS,
        value: valueInEth,
      });
    } catch (error) {
      console.error("Error sending donation:", error);
      setAmountError("Failed to send transaction. Please try again.");
    }
  };

  const fetchDonations = async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setIsLoading(true);
    }
    try {
      const response = await fetch("https://0000000000.org/transfers");
      if (!response.ok) {
        throw new Error("Failed to fetch donations");
      }
      const donations = await response.json();
      for (const donation of donations) {
        donation.eth_amount = donation.eth_amount.replace(/\.?0+$/, "");
      }

      // Sort donations by amount in descending order
      const sortedDonations = donations.sort((a: { eth_amount: string }, b: { eth_amount: string }) => {
        return parseFloat(b.eth_amount) - parseFloat(a.eth_amount);
      });

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
      className="flex flex-col items-center justify-start bg-[white] w-full max-w-5xl mx-auto py-0 px-8 font-mono"
      style={{ lineHeight: "133%" }}
    >
      <div className="flex w-full justify-center" /*style={{ gap: '80px' }}*/>
        <div className="w-[380px]">
          <h1 className="text-black text-xs font-normal leading-none mb-4">Ethereum (R1) is powered by you.</h1>
          <p className="text-black text-xs font-normal mb-6">
            Donate Below (or simply send ETH on ethereum mainnet to{" "}
            <span className="font-mono text-[10px] font-bold">{DONATION_ADDRESS}</span>)
          </p>
          <div className="mb-6">
            <div className="mb-2">
              <label htmlFor="donationAmount" className="block text-black text-xs mb-1">
                Donation Amount (ETH)
              </label>
              <div className="relative">
                <input
                  id="donationAmount"
                  type="text"
                  value={donationAmount}
                  onChange={handleAmountChange}
                  placeholder="0.00"
                  className={`w-full p-2 text-xs font-mono bg-white border ${amountError ? "border-red-500" : "border-gray-300"} rounded-none focus:outline-none`}
                />
                {amountError && <div className="text-red-500 text-[10px] mt-1">{amountError}</div>}
              </div>
            </div>
            <div className="mt-4">
              {!isConnected ? (
                <div className="w-full">
                  <RainbowKitCustomConnectButton buttonText="Connect To Donate" />
                </div>
              ) : (
                <button
                  onClick={handleDonate}
                  disabled={!!amountError || !donationAmount || !isConnected || isPending}
                  className="btn btn-primary btn-sm min-w-[180px]"
                >
                  {isPending ? "Confirming..." : "Donate"}
                </button>
              )}
              {isPending && <div className="text-blue-500 text-xs mt-2">Tx pending...</div>}
              {isSuccess && (
                <div className="text-green-500 text-xs mt-2">
                  Tx submitted! Thank you for your donation.{" "}
                  <a
                    href={`https://etherscan.io/tx/${txHash}`}
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
              {isError && <div className="text-red-500 text-xs mt-2">Tx failed. Please try again.</div>}
            </div>
          </div>
          <p className="text-black text-xs font-normal mb-6">
            This project exists thanks to the generosity of the Ethereum community. There's no token, no foundation, no
            VC — just ETH from those who believe public infrastructure should remain public. Thank you.
          </p>
          <p className="text-black text-xs font-normal mb-4">
            Below, we list all donors (by amount) with deep gratitude. Your support isn't just funding code — it's
            backing a future where rollups stay credibly neutral. Thank you.
          </p>
          <div className="text-black text-xs">......................................................</div>
          <br></br>
          <div className="flex flex-col w-full">
            <div className="flex w-full items-center">
              <div className="w-1/2 text-black text-xs">Donation Address</div>
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
                <div className="text-black text-xs text-right">Amount (ETH)</div>
              </div>
            </div>
            <br></br>
            {isLoading ? (
              <div className="text-black text-xs">Loading donations...</div>
            ) : (
              donations.map((donation, index) => (
                <div key={index}>
                  <div className="flex w-full pt-1">
                    <div className="w-3/4 text-black text-[10px]">{`${index + 1}. ${donation.from_name}`}</div>
                    <div className="w-1/4 text-black text-xs text-right">{donation.eth_amount} ETH</div>
                  </div>
                  <div className="text-black text-xs">.......................................................</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
