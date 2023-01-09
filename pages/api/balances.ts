import { NextApiRequest, NextApiResponse } from "next";
import { getBinanceBalance, getConfig } from "lib";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const config = getConfig();

    res.status(200).json({ usdValue: await getBinanceBalance(config.BINANCE) });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, error: err });
  }
};

export default handler;
