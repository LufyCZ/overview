import { NextApiRequest, NextApiResponse } from "next";
import { getBitcoinBalances, getConfig } from "../../../lib";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const config = getConfig();

    res
      .status(200)
      .json({ usdValue: await getBitcoinBalances(config.BITCOIN) });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, error: err });
  }
};

export default handler;
