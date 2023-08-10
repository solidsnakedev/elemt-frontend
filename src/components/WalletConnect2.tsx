"use client";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import WalletModal2 from "./WalletModal2";

const WalletConnect2 = () => {
  const { isConnected, stakeAddress, disconnect } = useCardano({
    limitNetwork: NetworkType.TESTNET,
  });

  return (
    <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
      {isConnected ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <h1>
            {stakeAddress!.slice(0, 10)}
            {"..."}
            {stakeAddress!.slice(stakeAddress!.length - 6)}
          </h1>
          <button
            className="btn btn-square btn-outline"
            onClick={() => {
              disconnect();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <></>
      )}
      <WalletModal2 />
    </div>
  );
};

export default WalletConnect2;
