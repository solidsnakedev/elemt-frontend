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
        "pool1vntql3yhyzzm3p846mds33nmuzz30jrn56fvjdd3hhu9u5n9d4d"
      )
      .complete();
    res.status(200).json({ tx: tx.toString() });
  } else {
    // Handle any other HTTP method
  }
}
