import React, { FC } from "react";

interface Card {
  title: string;
}

const Card: FC<Card> = ({ title, children }) => {
  return (
    <div className="p-4 space-y-4 rounded-xl">
      <div className="text-lg">{title}</div>
      <div className="w-full h-[1.4px] bg-slate-800" />
      <div className="space-y-2">{children}</div>
    </div>
  );
};

export default Card;
