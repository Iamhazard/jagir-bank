
import { Metadata } from "next";

import React from "react";
import Chart from "../../_component/Charts/page";

export const metadata: Metadata = {
  title: "Next.js Chart | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Chart page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const BasicChartPage: React.FC = () => {
  return (

    <Chart />

  );
};

export default BasicChartPage;
