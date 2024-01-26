import React from "react";
import { Chart } from "react-google-charts";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const data = [
  ["Admin", "FreeLancer", "Client"],
  [1, 37.8, 80.8, 41.8],
  [2, 30.9, 69.5, 32.4],
  [3, 25.4, 57, 25.7],
];

export const options = {
  chart: {
    title: "Users Data",
    subtitle: "user per day",
  },
};

export const ChartData = async () => {
  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
};

export default ChartData;
