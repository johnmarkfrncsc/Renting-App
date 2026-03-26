import { useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Building2, CheckCircle, XCircle, DollarSign } from "lucide-react";

import useOverviewData from "../components/hooks/useOverviewData.js";
import getOverviewStats from "../utils/getOverviewStats.js";

import StatsCard from "../components/cards/StatsCard.jsx";
import OccupancyCard from "../components/cards/OccupancyCard.jsx";
import RecentProperties from "../components/overview/RecentProperties.jsx";
import RevenueChart from "../components/overview/RevenueChart.jsx";

const OverviewPage = () => {
  const { user } = useContext(AuthContext);

  const { properties, isLoading, error } = useOverviewData(user.id);

  const {
    totalProperties,
    occupiedProperties,
    vacantProperties,
    totalRevenue,
    occupancyRate,
    recentProperties,
  } = getOverviewStats(properties);

  const stats = [
    {
      label: "Total Properties",
      value: totalProperties,
      icon: <Building2 size={20} />,
      iconBg: "bg-gray-200",
      iconColor: "text-gray-600",
    },
    {
      label: "Occupied",
      value: occupiedProperties.length,
      icon: <CheckCircle size={20} />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Vacant",
      value: vacantProperties.length,
      icon: <XCircle size={20} />,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      label: "Total Monthly Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={20} />,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Overview</h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      <OccupancyCard
        rate={occupancyRate}
        occupied={occupiedProperties.length}
        vacant={vacantProperties.length}
      />

      <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-sm font-semibold mb-4">Recent Properties</h3>

        <table className="w-full text-left">
          <thead className="text-gray-700 bg-gray-50 text-xs">
            <tr>
              <th className="px-4 py-4">Property</th>
              <th className="px-4 py-4">Price</th>
            </tr>
          </thead>
          <tbody>
            {recentProperties.map((property) => (
              <RecentProperties key={property._id} property={property} />
            ))}
          </tbody>
        </table>
      </div>

      <RevenueChart occupied={occupiedProperties} />
    </div>
  );
};

export default OverviewPage;
