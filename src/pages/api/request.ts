import { Blockfrost, Lucid } from "lucid-cardano";
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
        return Lucid.new(b, "Preprod");
      } else {
        const b = new Blockfrost(
          process.env.API_URL_MAINNET!,
          process.env.BLOCKFROST_KEY_MAINNET!
        );
        return Lucid.new(b, "Mainnet");
      }
    };
    const lucid = await initLucid();
    const data = req.body;
    lucid.selectWalletFrom({ address: data.address });
    const rewardAddress = await lucid.wallet.rewardAddress();
    const tx = await lucid
      .newTx()
      .delegateTo(
        rewardAddress!,
        "pool19ut4284xy9p82dd0cglzxweddfqw73yennkjk6mmp650chnr6lz"
      )
      .complete();
    res.status(200).json({ tx: tx.toString() });
  } else {
    // Handle any other HTTP method
  }
}
