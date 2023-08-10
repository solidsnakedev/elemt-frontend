"use client";

import {
  cardanoPreprodWalletConnect,
  disconnect,
  FlintConnector,
  getActiveConnector,
  init,
  InjectedConnector,
  switchConnector,
  WalletConnectConnector,
  watchAddress,
} from "@dcspark/adalib";
import { SetStateAction, useCallback, useState } from "react";
import { EnabledAPI } from "@dcspark/adalib/dist/types/CardanoInjected";

declare global {
  interface Window {
    my_modal_2: any;
  }
}

const WalletModal3 = () => {
  const [enabledAPI, setEnabledAPI] = useState<EnabledAPI>();
  const [address, setAddress] = useState<string>();

  watchAddress((watchedAddress: SetStateAction<string | undefined>) => {
    // console.log("watchAddress", watchedAddress);
    setAddress(watchedAddress);
  });

  // const getAddressBech32 = useCallback(async () => {
  //     if (enabledAPI){
  //       const anyAddress = await enabledAPI.getUsedAddresses() ? await enabledAPI.getUsedAddresses(): await enabledAPI.getUnusedAddresses()
  //       const addressBech32 = C.Address.from_bytes(fromHex(anyAddress[0])).to_bech32(undefined)
  //       console.log(addressBech32)
  //     }
  // },[enabledAPI])

  init(
    () => ({
      connectorName: InjectedConnector.connectorName("window.cardano.nami"),
      // WalletConnectConnector.connectorName(),
      connectors: [
        new FlintConnector(),
        new InjectedConnector("window.cardano.eternl"),
        new InjectedConnector("window.cardano.nami"),
        new WalletConnectConnector({
          relayerRegion: `wss://relay.walletconnect.com`,
          metadata: {
            description: "Test app for adalib",
            name: "Test Adalib dApp",
            icons: ["https://avatars.githubusercontent.com/u/37784886"],
            url: "http://localhost:3030",
          },
          autoconnect: true,
          qrcode: true,
        }),
      ],
      chosenChain: cardanoPreprodWalletConnect(),
    }),
    process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECTID
  );

  const toConnectorName = (walletName: string) => {
    return `injected-window.cardano.${walletName}`;
  };

  const cipWallets = ["nami", "eternl", "flint"];

  const handleClick = (name: string) => {
    disconnect()
    switchConnector(name);
    enableConnector();
  };

  const enableConnector = useCallback(() => {
    getActiveConnector()
      .enable()
      .then((api) => {
        // console.log("CIP-30 API Created", { api });
        setEnabledAPI(api);
      })
      .catch((e) => {
        console.log("Error enabling connector", e);
      });
  }, [setEnabledAPI]);

  return (
    <>
      <button
        className="btn btn-outline"
        onClick={() => window.my_modal_2.showModal()}
      >
        {address ? "CONNECTED" : "CONNECT"}
      </button>
      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <div className="flex flex-col gap-3 sm:gap-6 lg:gap-8">
            {cipWallets.map((provider: string) => (
              <div key={provider} className="flex justify-between">
                <button
                  className="btn btn-outline"
                  onClick={() => handleClick(toConnectorName(provider))}
                >
                  {provider}
                </button>
              </div>
            ))}
            <div className="flex ">
              <button
                className="btn btn-outline"
                onClick={() =>
                  handleClick(WalletConnectConnector.connectorName())
                }
              >
                WalletConnect
              </button>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default WalletModal3;
