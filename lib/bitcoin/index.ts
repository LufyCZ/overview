import { timeoutFetcher } from "lib/fetcher";
import { getTokenPrice } from "../index";

async function getBitcoinBalance1(address?: string) {
  return fetch(`https://blockchain.info/q/addressbalance/${address}`)
    .then((data) => data.text())
    .then((balance) => Number(balance) / 10 ** 8);
}

async function getBitcoinBalance2(address?: string) {
  return fetch(`https://chain.api.btc.com/v3/address/${address}`)
    .then((data) => data.json())
    .then(({ data }) => data.balance / 10 ** 8);
}

async function getBitcoinBalance(address?: string) {
  const btcPrice = getTokenPrice("bitcoin");
  const btcBalance = timeoutFetcher(
    [getBitcoinBalance1, getBitcoinBalance2],
    [address],
    2000
  );

  return (await btcPrice) * (await btcBalance);
}

export async function getBitcoinBalances(addresses?: string[]) {
  const data = await Promise.all(
    addresses?.map((address) => getBitcoinBalance(address))
  );

  return data.reduce((acc, cur) => acc + cur, 0);
}
