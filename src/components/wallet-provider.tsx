"use client";
// import { CardanoProvider, UseCardanoOptions } from "use-cardano";
import dynamic from "next/dynamic";
import { UseCardanoOptions } from "use-cardano";
// const options: UseCardanoOptions = {
//   node: {
//     provider: "blockfrost-proxy",
//     proxyUrl: "/api/blockfrost",
//   },
// };

const CardanoProvider = dynamic(
  () => import("use-cardano").then((mod) => mod.CardanoProvider),
  {
    ssr: false,
  }
);

const options: UseCardanoOptions = {
  node: {
    provider: "blockfrost",
    projectId: "preprodOr3zZOkFc8Sqa5sp3aa9oGTb1wxulzhy",
  },
  testnetNetwork: "Preprod",
  allowedNetworks: ["Testnet"],
};

export default function WalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CardanoProvider options={options}>{children}</CardanoProvider>;
}
