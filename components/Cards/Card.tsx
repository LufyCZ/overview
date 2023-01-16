import classNames from "classnames";
import React, { FC } from "react";

interface Card {
  title: string;
  className?: string;
}

export const Card: FC<Card> = ({ title, children, className }) => {
  return (
    <div className={classNames(className, "p-4 space-y-4 rounded-xl")}>
      <div className="text-lg">{title}</div>
      <div className="w-full h-[1.4px] bg-slate-800" />
      <div>{children}</div>
    </div>
  );
};
