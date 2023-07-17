"use client";
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

//TODO: this needs to be in server component
const options: UseCardanoOptions = {
  node: {
    provider: "blockfrost",
    projectId: process.env.BLOCKFROST_KEY,
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
