"use client";

import React, { ReactElement } from "react";

import { ChartBox } from "./totalMessage.style";
import { TotalMessageController } from "./totalMessage.controller";
import { ChartContainer, Chart } from "@/components/common";
import ChartProvider from "@/components/common/charts/context/chart-context";
import { ChartsTooltipEnum } from "@/enum";
import { StringHelper } from "@/helpers";

/**
 * Total Message Graph
 * @return {ReactElement}
 */
export function TotalMessage(): ReactElement {
  const { getters } = TotalMessageController();
  const { title, chartOptions, series, enableButton } = getters;

  return (
    <ChartProvider id={StringHelper.replaceSpaceToDash(title)}>
      <ChartContainer
        title={title}
        description="This chart shows the total messages exchanged between the bot and the user."
        disableAction={enableButton}
      >
        <ChartBox>
          <Chart
            height={300}
            options={chartOptions}
            series={[{ name: ChartsTooltipEnum.TOTAL_MESSAGE, data: series }]}
            type="bar"
          />
        </ChartBox>
      </ChartContainer>
    </ChartProvider>
  );
}

export default React.memo(TotalMessage);
