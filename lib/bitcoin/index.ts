import { getTokenPrice } from "../index";

export async function getBitcoinBalance(address?: string) {
  const btcPrice = await getTokenPrice("bitcoin");

  return fetch(`https://chain.api.btc.com/v3/address/${address}`)
    .then((data) => data.json())
    .then(({ data }) => (data.balance * btcPrice) / 10 ** 8);
}

export async function getBitcoinBalances(addresses?: string[]) {
  const data = await Promise.all(
    addresses?.map((address) => getBitcoinBalance(address))
  );

  return data.reduce((acc, cur) => acc + cur, 0);
}
