import useSWR from "swr";

export async function getTokenPrice(tokenId: string) {
  const data = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
  ).then((data) => data.json());

  return Number((Object.values(data)[0] as any).usd);
}

export function useTokenPrice(tokenId: string) {
  const { data } = useSWR(["price", tokenId], () => getTokenPrice(tokenId));

  return data;
}
