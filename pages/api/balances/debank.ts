import { NextApiRequest, NextApiResponse } from "next";
import { getConfig } from "../../../lib/config";
import { getDebankBalances } from "../../../lib/debank/index";

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const config = getConfig();

    res.status(200).json({ usdValue: await getDebankBalances(config.DEBANK) });
  } catch (err: any) {
    res.status(500).json({ statusCode: 500, error: err });
  }
};

export default handler;
