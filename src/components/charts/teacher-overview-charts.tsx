"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { classMix, teacherSeries, topicMastery } from "@/data/mock";

const colors = ["#147A6A", "#EF9B22", "#B72F3B"];

export function TeacherOverviewCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <article className="rounded-2xl border bg-surface p-4">
        <h3 className="mb-3 font-bold">Weekly Performance Trend</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <LineChart data={teacherSeries}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgScore" stroke="#147A6A" strokeWidth={2.5} />
              <Line type="monotone" dataKey="engagement" stroke="#EF9B22" strokeWidth={2.5} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-2xl border bg-surface p-4">
        <h3 className="mb-3 font-bold">Topic Mastery by Class</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={topicMastery}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="topic" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="mastery" fill="#147A6A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      <article className="rounded-2xl border bg-surface p-4 lg:col-span-2">
        <h3 className="mb-3 font-bold">Class Support Distribution</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie data={classMix} dataKey="value" nameKey="name" outerRadius={120}>
                {classMix.map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </article>
    </div>
  );
}
