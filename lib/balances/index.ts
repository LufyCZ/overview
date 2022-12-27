import useSWR from "swr";

export const Services = {
  Binance: "binance",
  Bitcoin: "bitcoin",
  Validators: "validators",
  Debank: "debank",
  Fio: "fio",
  Degiro: "degiro",
} as const;

export function useBalance(service: keyof typeof Services) {
  const { data } = useSWR<{ usdValue: number }>([service, "balance"], () =>
    fetch(`/api/balances/${Services[service]}`).then((data) => data.json())
  );

  return data?.usdValue;
}
