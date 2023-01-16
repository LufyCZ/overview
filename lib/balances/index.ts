import { Config } from "config.sample";
import { getDebankBalances } from "lib/debank/index";
import {
  getBinanceBalance,
  getBitcoinBalances,
  getDegiroBalance,
  getFioBalance,
  getValidatorsBalances,
} from "lib/index";
import useSWR from "swr";

export enum Service {
  Binance = "binance",
  Bitcoin = "bitcoin",
  Validators = "validators",
  Debank = "debank",
  Fio = "fio",
  Degiro = "degiro",
}

export const ServiceFetcher: Record<
  Service,
  (config: Config) => Promise<number>
> = {
  binance: (config) => getBinanceBalance(config.BINANCE),
  bitcoin: (config) => getBitcoinBalances(config.BITCOIN),
  validators: (config) => getValidatorsBalances(config.VALIDATOR_DEPLOYERS),
  debank: (config) => getDebankBalances(config.DEBANK),
  fio: (config) => getFioBalance(config.FIO),
  degiro: (config) => getDegiroBalance(config.DEGIRO),
} as const;

export function getBalance(service: Service, config: Config) {
  return ServiceFetcher[service](config);
}

export function useBalance(service: Service) {
  const { data } = useSWR<{ usdValue: number }>(
    [Service[service], "balance"],
    () => fetch(`/api/balances/${Service[service]}`).then((data) => data.json())
  );

  return data?.usdValue;
}
