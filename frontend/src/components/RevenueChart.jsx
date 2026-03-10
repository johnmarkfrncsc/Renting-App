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
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Revenue per Property
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#1A1A1A" barSize={100} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
