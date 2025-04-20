"use client";

import { useTheme } from "next-themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    revenue: 2400,
    expenses: 1400,
  },
  {
    name: "Feb",
    revenue: 3000,
    expenses: 1800,
  },
  {
    name: "Mar",
    revenue: 2600,
    expenses: 1600,
  },
  {
    name: "Apr",
    revenue: 4000,
    expenses: 2000,
  },
  {
    name: "May",
    revenue: 3400,
    expenses: 1700,
  },
  {
    name: "Jun",
    revenue: 3800,
    expenses: 1900,
  },
  {
    name: "Jul",
    revenue: 4200,
    expenses: 2100,
  },
  {
    name: "Aug",
    revenue: 4600,
    expenses: 2200,
  },
  {
    name: "Sep",
    revenue: 4200,
    expenses: 2000,
  },
  {
    name: "Oct",
    revenue: 5200,
    expenses: 2500,
  },
  {
    name: "Nov",
    revenue: 5000,
    expenses: 2300,
  },
  {
    name: "Dec",
    revenue: 5800,
    expenses: 2800,
  },
];

export function Overview() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke={isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}
        />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          stroke={isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2731" : "#fff",
            borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            color: isDark ? "#fff" : "#333",
          }}
        />
        <Bar
          dataKey="revenue"
          name="Revenue"
          radius={[4, 4, 0, 0]}
          fill={isDark ? "#5f62e8" : "#4f46e5"}
          fillOpacity={0.9}
        />
        <Bar
          dataKey="expenses"
          name="Expenses"
          radius={[4, 4, 0, 0]}
          fill={isDark ? "#d45b5b" : "#ef4444"}
          fillOpacity={0.8}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
