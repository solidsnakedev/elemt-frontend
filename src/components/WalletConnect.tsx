"use client";
import { useEffect } from "react";
import { AvailableProvider, useCardano } from "use-cardano";
import WalletModal from "./WalletModal";
// import { AvailableProvider, useCardano } from "use-cardano";

const WalletConnect = () => {
  const { availableProviders, setWalletProvider, account } = useCardano();

  return (
    <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
      {account.address ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <h1>
            {account.address.slice(0, 10)}
            {"..."}
            {account.address.slice(account.address.length - 6)}
          </h1>
          <button
            className="btn btn-square btn-outline"
            onClick={() => {
              setWalletProvider(undefined);
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
      <WalletModal />
    </div>
  );
};

export default WalletConnect;
