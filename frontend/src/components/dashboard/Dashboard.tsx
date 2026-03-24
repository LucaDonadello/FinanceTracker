import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";

// ─── Placeholder data (swap with real data later) ─────────────────────────────

const barData = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 3800 },
  { month: "Mar", value: 5100 },
  { month: "Apr", value: 4700 },
  { month: "May", value: 6200 },
  { month: "Jun", value: 5800 },
];

const lineData = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 1900 },
  { month: "Mar", value: 1500 },
  { month: "Apr", value: 2400 },
  { month: "May", value: 2100 },
  { month: "Jun", value: 3100 },
];

const pieData = [
  { name: "Category A", value: 40 },
  { name: "Category B", value: 25 },
  { name: "Category C", value: 20 },
  { name: "Category D", value: 15 },
];

const ytdData = [
  { month: "Jan", current: 4200, previous: 3800 },
  { month: "Feb", current: 8000, previous: 7200 },
  { month: "Mar", current: 13100, previous: 11500 },
  { month: "Apr", current: 17800, previous: 15900 },
  { month: "May", current: 24000, previous: 20100 },
  { month: "Jun", current: 29800, previous: 24600 },
];

const PIE_COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe"];

// ─── Chart card wrapper ───────────────────────────────────────────────────────

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-5">
      <div>
        <p className="text-sm font-semibold text-slate-100">{title}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-52">{children}</div>
    </div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800 px-3 py-2 shadow-xl text-xs">
      {label && <p className="text-slate-400 mb-1">{label}</p>}
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name !== "value" ? `${p.name}: ` : ""}
          {typeof p.value === "number" ? p.value.toLocaleString() : p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-6">
      {/* Stat pills */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Revenue",  value: "$29,800", delta: "+12%",  up: true  },
          { label: "Active Users",   value: "3,241",   delta: "+5%",   up: true  },
          { label: "Conversion",     value: "4.6%",    delta: "-0.3%", up: false },
          { label: "Avg. Order",     value: "$94",     delta: "+8%",   up: true  },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/60 px-4 py-3"
          >
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <p className="text-xl font-bold text-slate-100">{stat.value}</p>
            <p className={`text-xs font-medium mt-0.5 ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
              {stat.delta} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Bar chart */}
        <ChartCard title="Monthly Revenue" subtitle="Placeholder — replace with real data">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#ffffff08" }} />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Pie / donut chart */}
        <ChartCard title="Category Breakdown" subtitle="Placeholder — replace with real data">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Line chart */}
        <ChartCard title="Growth Trend" subtitle="Placeholder — replace with real data">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ fill: "#6366f1", r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* YTD area chart */}
        <ChartCard title="Year to Date" subtitle="Placeholder — replace with real data">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ytdData}>
              <defs>
                <linearGradient id="currentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="previousGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#94a3b8" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} width={45} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                formatter={(value) => (
                  <span style={{ color: "#94a3b8", fontSize: 11 }}>{value}</span>
                )}
              />
              <Area type="monotone" dataKey="previous" name="Previous year" stroke="#94a3b8" strokeWidth={1.5} fill="url(#previousGrad)" dot={false} />
              <Area type="monotone" dataKey="current"  name="Current year"  stroke="#6366f1" strokeWidth={2.5} fill="url(#currentGrad)"  dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
}