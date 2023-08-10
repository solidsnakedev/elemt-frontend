"use client";

import { useEffect } from "react";
import { AvailableProvider, useCardano } from "use-cardano";
import Image from "next/image";

declare global {
  interface Window {
    my_modal_2: any;
  }
}

const WalletModal = () => {
  const {
    availableProviders,
    walletApi,
    setWalletProvider,
    account,
    lucid,
    setLucid
  } = useCardano();

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <button
        className="btn btn-outline"
        onClick={() => window.my_modal_2.showModal()}
      >
        {account.address ? "CONNECTED" : "CONNECT"}
      </button>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <div className="flex flex-col gap-3 sm:gap-6 lg:gap-8">
            {availableProviders.map((provider: AvailableProvider) => (
              <div key={provider.key} className="flex justify-between">
                <button
                  className="btn btn-outline"
                  onClick={() => setWalletProvider(provider.key)}
                >
                  {provider.name}
                </button>
                <span className="h-auto w-9">
                  <Image
                    src={provider.icon}
                    alt={provider.key}
                    width={36}
                    height={10}
                  />
                </span>
              </div>
            ))}
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default WalletModal;
