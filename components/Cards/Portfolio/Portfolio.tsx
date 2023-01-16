import React, { useMemo } from "react";
import { COLORS } from "config/colors";
import { Service, useBalance, formatUSD } from "lib";
import { Circle } from "components/Chart";

export const Portfolio = () => {
  const balances = Object.keys(Service).map((service: Service) => ({
    label: service,
    amount: useBalance(service),
  }));

  const total = balances.reduce((acc, cur) => (acc += cur?.amount ?? 0), 0);

  const values = useMemo(
    () =>
      balances.map((balance, i) => ({
        ...balance,
        color: COLORS[i],
        value: Number(((balance.amount / total) * 100).toFixed(2)),
      })),
    [balances, total]
  );

  return (
    <div className="grid gap-4 xl:grid-cols-5">
      <div className="w-full col-span-3 space-y-2">
        <div className="grid grid-flow-col grid-cols-2 min-w-fit">
          <div className="space-y-2">
            {values.map((value, i) => (
              <div key={i} className="flex flex-row items-center space-x-2">
                <div
                  className="w-4 h-4 border-black"
                  style={{ backgroundColor: value.color }}
                />
                <div>{value.label}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {values.map((value, i) => (
              <div key={i} className="flex justify-end">
                <div>{formatUSD(value.amount)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-slate-800" />
        <div className="grid w-full grid-flow-col grid-cols-2">
          <div>Total</div>
          <div>
            <div className="flex justify-end">{formatUSD(total)}</div>
          </div>
        </div>
      </div>
      <div className="flex col-span-2">
        <Circle data={values} />
      </div>
    </div>
  );
};
