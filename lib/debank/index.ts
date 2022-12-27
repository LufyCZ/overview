export async function getDebankBalance(address?: string) {
  const { data }: { data: { user: { usd_value: number } } } = await fetch(
    `https://api.debank.com/hi/user/info?id=${address}`
  ).then((data) => data.json());

  return data.user.usd_value;
}

export async function getDebankBalances(addresses?: string[]) {
  const data = await Promise.all(
    addresses?.map((address) => getDebankBalance(address))
  );

  return data.reduce((acc, cur) => acc + cur, 0);
}
