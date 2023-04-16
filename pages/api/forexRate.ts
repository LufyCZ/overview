import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=3600, stale-while-revalidate=3600"
  );

  const { toSymbol } = req.query;

  try {
    const { rates } = await fetch(
      `https://openexchangerates.org/api/latest.json?app_id=${process.env.OPEN_EXCHANGE_RATES_ID}&base=USD&symbols=${toSymbol}&show_alternative=false`
    ).then((data) => data.json());

    return res.status(200).json({ rate: Object.values(rates)[0] });
  } catch (err) {
    return res.status(500).json({ statusCode: 500, error: err });
  }
};

export default handler;
