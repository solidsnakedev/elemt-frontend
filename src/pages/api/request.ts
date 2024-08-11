import { Blockfrost, Lucid } from "@lucid-evolution/lucid";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process a POST request
    const initLucid = () => {
      if (process.env.NODE_ENV === "development") {
        const b = new Blockfrost(
          process.env.API_URL_PREPROD!,
          process.env.BLOCKFROST_KEY_PREPROD!
        );
        return Lucid(b, "Preprod");
      } else {
        const b = new Blockfrost(
          process.env.API_URL_MAINNET!,
          process.env.BLOCKFROST_KEY_MAINNET!
        );
        return Lucid(b, "Mainnet");
      }
    };
    const lucid = await initLucid();
    const data = req.body;

    lucid.selectWallet.fromAddress(data.address, [])
    const rewardAddress = await lucid.wallet().rewardAddress();
    const tx = await lucid
      .newTx()
      .delegateTo(
        rewardAddress!,
        process.env.NODE_ENV === "development"
          ? process.env.POOL_ID_PREPROD!
          : process.env.POOL_ID_MAINNET!
      )
      .complete();
    res.status(200).json({ tx: tx.toCBOR() });
  } else {
    // Handle any other HTTP method
  }
}

export const parse = (json: string) =>
  JSON.parse(json, (key, value) =>
    typeof value === "string" && /^\d+n$/.test(value)
      ? BigInt(value.slice(0, -1))
      : value
  );
