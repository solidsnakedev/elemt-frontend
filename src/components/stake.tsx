"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";
import { Lucid } from "lucid-cardano";

const Stake = () => {
  const { isConnected, usedAddresses, enabledWallet } = useCardano({
    limitNetwork: NetworkType.TESTNET,
  });
  const handleAPI = async () => {
    if (isConnected && enabledWallet) {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: usedAddresses[0] }),
      });
      const { tx } = await response.json();
      const api = await window.cardano[enabledWallet].enable();
      const lucid = (await Lucid.new(undefined, undefined)).selectWallet(api);
      const signedTx = await lucid.fromTx(tx).sign().complete();
      const txh = await signedTx.submit();
      console.log(txh);
    }
  };

  return (
    <>
      {isConnected ? (
        <div className="flex flex-col items-center gap-3 sm:gap-6 lg:gap-8">
          <button className="btn btn-outline" onClick={handleAPI}>
            Delegate
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Stake;
