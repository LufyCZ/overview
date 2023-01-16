import React, { FC } from "react";
import { VictoryLabel, VictoryPie, VictoryTooltip } from "victory";

interface Circle {
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

class LabelComponent extends React.Component {
  render() {
    return (
      <g>
        <VictoryLabel {...(this.props as any)} />
        <VictoryTooltip
          {...this.props}
          x={200}
          y={240}
          orientation="top"
          cornerRadius={50}
          pointerLength={0}
          flyoutHeight={0}
          flyoutWidth={0}
          flyoutStyle={{ fill: "transparent", stroke: "transparent" }}
          style={{ fill: "white", fontSize: "36px" }}
        />
        <VictoryTooltip
          {...this.props}
          x={200}
          y={275}
          orientation="top"
          cornerRadius={50}
          pointerLength={0}
          flyoutHeight={0}
          flyoutWidth={0}
          flyoutStyle={{ fill: "transparent", stroke: "transparent" }}
          style={{ fill: "white", fontSize: "20px" }}
          text={({ datum }) => `${datum.value}%`}
        />
      </g>
    );
  }
}

// @ts-ignore
LabelComponent.defaultEvents = VictoryTooltip.defaultEvents;

export const Circle: FC<Circle> = ({ data }) => {
  const pieData = data.filter((el) => el.value !== 0 && !isNaN(el.value));

  return (
    <VictoryPie
      style={{
        labels: { fill: "white" },
        data: {
          fill: (d) => d.datum.color,
        },
      }}
      labelComponent={<LabelComponent />}
      innerRadius={110}
      radius={135}
      labelRadius={150}
      data={pieData}
      x={(el) => el.label}
      y={(el) => el.value}
    />
  );
};
