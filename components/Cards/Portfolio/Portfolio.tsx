import React from "react";
import { COLORS } from "config/colors";
import { Services, useBalance, formatUSD } from "lib";

export const Portfolio = () => {
  const values = Object.keys(Services).map(
    (service: keyof typeof Services) => ({
      name: service,
      amount: useBalance(service),
    })
  );

  const total = values.reduce((acc, cur) => (acc += cur?.amount ?? 0), 0);

  return (
    <>
      <div className="grid grid-flow-col grid-cols-2">
        <div className="space-y-2">
          {values.map((value, i) => (
            <div key={i} className="flex flex-row items-center space-x-2">
              <div
                className="w-4 h-4 border-black"
                style={{ backgroundColor: COLORS[i] }}
              />
              <div>{value.name}</div>
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
    </>
  );
};
