"use client";
import { useEffect } from "react";
import {AvailableProvider, useCardano} from "use-cardano";
// import { AvailableProvider, useCardano } from "use-cardano";

const WalletConnect = () => {
  const { availableProviders, setWalletProvider } = useCardano();
  // const { account } = useCardano();

  const onConnect = () => alert("Successfully connected!");

  // return (
  //   <>
  //   <div>
  //   hi
  //   </div>
  //   </>
  // );
  // return (
  //   <>
  //     <div className="flex-none">
  //       <a className="btn btn-outline btn-primary text-xl">Connect</a>
  //     </div>
  //   </>
  // );
  //
  // return (
  //   <>
  //     <button onClick={() => alert("testing")}> Test </button>
  //   </>
  // );
  return (
    <div>
      {availableProviders.map((provider: AvailableProvider) => (
        <div key={provider.key}>
          <button onClick={() => setWalletProvider(provider.key)}>
            {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default WalletConnect
