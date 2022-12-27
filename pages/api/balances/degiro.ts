import { NextApiRequest, NextApiResponse } from "next";
import { getConfig, getDegiroBalance } from "../../../lib";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const config = getConfig();

    res.status(200).json({ usdValue: await getDegiroBalance(config.DEGIRO) });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, error: err });
  }
};

export default handler;
