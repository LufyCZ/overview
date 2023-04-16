import { formatCZK, formatUSD } from "lib";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

enum Currencies {
  USD,
  CZK,
}

const CURRENCIES_FORMAT: Record<Currencies, (amount: number) => string> = {
  [Currencies.USD]: (amount: number) => formatUSD(amount),
  [Currencies.CZK]: (amount: number) => formatCZK(amount),
};

const CURRENCIES_CONVERT: Record<Currencies, () => number | Promise<number>> = {
  [Currencies.USD]: () => 1,
  [Currencies.CZK]: () =>
    fetch(`api/forexRate?toSymbol=CZK`)
      .then((res) => res.json())
      .then((data) => data.rate),
};

export const CurrencyAmount = ({ amount }: { amount: number }) => {
  const [currency, setCurrency] = useState<Currencies>(Currencies.CZK);
  const [text, setText] = useState<string>();

  const { data: rate } = useSWR(
    ["rate", currency.toString()],
    CURRENCIES_CONVERT[currency]
  );

  useEffect(() => {
    if (rate) {
      setText(CURRENCIES_FORMAT[currency](amount * rate));
    } else {
      setText("-");
    }
  }, [currency, amount]);

  return <>{text}</>;
};
