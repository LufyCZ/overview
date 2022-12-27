import { MainClient } from "binance";
import { Config } from "../../config.sample";
import { getTokenPrice } from "../index";

export async function getBinanceBalance(binance: Config["BINANCE"]) {
  const client = new MainClient({
    api_key: binance.public,
    api_secret: binance.private,
  });

  const btcPrice = await getTokenPrice("bitcoin");

  const { totalNetAssetOfBtc: crossMarginNetAssetBtc } =
    await client.queryCrossMarginAccountDetails();

  const { totalNetAssetOfBtc: isolatedMarginNetAssetBtc } =
    await client.getIsolatedMarginAccountInfo();

  const spotAssetBtc = await client
    .postPrivate("sapi/v3/asset/getUserAsset")
    .then((data) =>
      data.reduce(
        (acc: number, cur: { btcValuation: string }) =>
          acc + Number(cur.btcValuation),
        0
      )
    );

  const { totalAmountInBTC: lendingAssetBtc } = await client.getPrivate(
    "sapi/v1/lending/union/account"
  );

  const totalAssetBtc =
    Number(crossMarginNetAssetBtc.toString()) +
    Number(isolatedMarginNetAssetBtc.toString()) +
    spotAssetBtc +
    Number(lendingAssetBtc);

  return totalAssetBtc * btcPrice;
}
