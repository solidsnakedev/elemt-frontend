"use client";

import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { NetworkType } from "@cardano-foundation/cardano-connect-with-wallet-core";

declare global {
  interface Window {
    my_modal_2: any;
  }
}

const WalletModal2 = () => {
  const {
    isEnabled,
    isConnected,
    enabledWallet,
    stakeAddress,
    signMessage,
    connect,
    disconnect,
    usedAddresses,
    installedExtensions,
  } = useCardano({ limitNetwork: NetworkType.TESTNET });

  const onConnect = () => alert("Successfully connected!");
  console.log(isEnabled);
  console.log(enabledWallet);
  console.log(usedAddresses);

  return (
    <div>
      {/* <> */}
      {/*   {isConnected ? ( */}
      {/*     <span>{stakeAddress}</span> */}
      {/*   ) : ( */}
      {/*     <button onClick={() => connect("Nami")}>Connect</button> */}
      {/*   )} */}
      {/* </> */}
      {/* Open the modal using ID.showModal() method */}
      <button
        className="btn btn-outline"
        onClick={() => window.my_modal_2.showModal()}
      >
        {isConnected ? "CONNECTED" : "CONNECT"}
      </button>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <div className="flex flex-col gap-3 sm:gap-6 lg:gap-8">
            {installedExtensions.map((provider: string) => (
              <div key={provider} className="flex justify-between">
                <button
                  className="btn btn-outline"
                  onClick={() => connect(provider)}
                >
                  {provider}
                </button>
                {/* <span className="h-auto w-9"> */}
                {/*   <Image */}
                {/*     src={} */}
                {/*     alt={provider} */}
                {/*     width={36} */}
                {/*     height={10} */}
                {/*   /> */}
                {/* </span> */}
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

export default WalletModal2;
