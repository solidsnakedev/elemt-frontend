import { Blockfrost, Lucid } from "lucid-cardano";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Process a POST request
    const data = req.body;
    const b = new Blockfrost(process.env.API_URL!, process.env.BLOCKFROST_KEY!);
    const lucid = await Lucid.new(b, "Preprod");
    lucid.selectWalletFrom({ address: data.address });
    const rewardAddress = await lucid.wallet.rewardAddress();
    const tx = await lucid.newTx().
            delegateTo(
              rewardAddress!,
              "pool1vntql3yhyzzm3p846mds33nmuzz30jrn56fvjdd3hhu9u5n9d4d"
            ).complete()
    res.status(200).json({ tx: tx.toString() })

  } else {
    // Handle any other HTTP method
  }
}
