"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { date: "07-05", complaints: 2 },
  { date: "07-06", complaints: 1 },
  { date: "07-07", complaints: 3 },
  { date: "07-08", complaints: 2 },
  { date: "07-09", complaints: 4 },
  { date: "07-10", complaints: 3 },
  { date: "07-11", complaints: 5 },
];

const chartConfig = {
  complaints: {
    label: "Complaints",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function ComplaintsChart() {
  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 5)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            allowDecimals={false}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="complaints"
            type="monotone"
            stroke="var(--color-complaints)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
