import { NextApiRequest, NextApiResponse } from "next";
import { getConfig, getFioBalance } from "../../../lib";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const config = getConfig();

    res.status(200).json({ usdValue: await getFioBalance(config.FIO) });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500 });
  }
};

export default handler;
