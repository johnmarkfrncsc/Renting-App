import { useContext } from "react";
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
      iconBg: "bg-base-300",
      iconColor: "text-base-content",
    },
    {
      label: "Occupied",
      value: occupiedProperties.length,
      icon: <CheckCircle size={20} />,
      iconBg: "bg-success/80",
      iconColor: "text-success-content",
    },
    {
      label: "Vacant",
      value: vacantProperties.length,
      icon: <XCircle size={20} />,
      iconBg: "bg-warning/80",
      iconColor: "text-warning-content",
    },
    {
      label: "Total Monthly Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: <DollarSign size={20} />,
      iconBg: "bg-info/90",
      iconColor: "text-info-content",
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold text-base-content mb-6">Overview</h2>

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

      {/* Recent Properties */}
      <div className="bg-base-200 border border-base-300 rounded-xl p-6 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-base-content mb-4">
          Recent Properties
        </h3>
        <table className="w-full text-left">
          <thead className="text-base-content/60 bg-base-200 text-xs">
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
