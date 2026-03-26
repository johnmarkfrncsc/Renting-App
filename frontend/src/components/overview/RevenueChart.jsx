import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({ occupied }) => {
  const chartData = occupied.map((property) => ({
    name: property.rentTitle,
    revenue: property.rentPrice,
  }));

  return (
    <div className="bg-base-100 border border-base-300 rounded-xl p-6 shadow-sm mb-6">
      <h3 className="text-sm font-semibold text-base-content mb-4">
        Revenue per Property
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid stroke="currentColor" strokeOpacity={0.1} />
          <XAxis
            dataKey="name"
            tick={{ fill: "currentColor", opacity: 0.6, fontSize: 12 }}
          />
          <YAxis tick={{ fill: "currentColor", opacity: 0.6, fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-base-200)",
              border: "1px solid var(--color-base-300)",
              borderRadius: "0.5rem",
              color: "var(--color-base-content)",
            }}
          />
          <Bar dataKey="revenue" fill="var(--color-primary)" barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
