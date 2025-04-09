"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import data from "@/lib/analytics/registrationTrendsData";

export function RegistrationTrends() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Area
          yAxisId="left"
          type="monotone"
          dataKey="Registrations"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.2}
        />
        <Area
          yAxisId="right"
          type="monotone"
          dataKey="Cumulative Registrations"
          stroke="#10b981"
          fill="#10b981"
          fillOpacity={0.2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
