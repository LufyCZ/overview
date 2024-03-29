import numeral from "numeral";

export const formatNumber = (value: any) => {
  return numeral(value).format("(0.00a)");
};

export const formatPercent = (value: any) => numeral(value).format("0.00%");

export const formatUSD = (value: string | number, inputString = "$0.00a") => {
  if (Number(value) < 0.01) return "$0.00";
  return numeral(value).format(inputString);
};

export const formatCZK = (value: string | number) => {
  if (Number(value) < 0.01) return "0 Kč";
  return `${numeral(value).format("0,0.00a")} Kč`;
};
