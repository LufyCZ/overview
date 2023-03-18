export async function getDebankBalance(address?: string) {
  const { data }: any = await fetch(
    `https://api.debank.com/user?id=${address}`
  ).then((data) => data.json());

  return data.user.desc.usd_value;
}

export async function getDebankBalances(addresses?: string[]) {
  const data = await Promise.all(
    addresses?.map((address) => getDebankBalance(address))
  );

  return data.reduce((acc, cur) => acc + cur, 0);
}
