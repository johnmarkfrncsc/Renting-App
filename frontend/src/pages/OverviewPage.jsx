import { useState, useEffect, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { Building2, CheckCircle, XCircle, DollarSign } from "lucide-react";
import RevenueChart from "../components/RevenueChart";

const OverviewPage = () => {
  const { user } = useContext(AuthContext);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //* derived values:
  const totalProperties = properties.length;
  const occupied = properties.filter((p) => p.rentStatus === "occupied");
  const vacant = properties.filter((p) => p.rentStatus === "vacant");
  const totalRevenue = occupied.reduce((sum, p) => sum + p.rentPrice, 0);
  const occupancyRate =
    totalProperties > 0
      ? Math.round((occupied.length / totalProperties) * 100)
      : 0;

  const fetchOverviewData = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/rents");
      if (response.data.data) {
        const userProperties = response.data.data.filter(
          (property) => property.userId === user.id,
        );
        setProperties(userProperties);
      } else {
        setProperties([]);
      }
    } catch (err) {
      setError("Failed to load properties");
      console.error("Error fetching properties:", err);
      setProperties([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const stats = [
    {
      label: "Total Properties",
      value: totalProperties,
      icon: <Building2 size={20} />,
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      label: "Occupied",
      value: occupied.length,
      icon: <CheckCircle size={20} />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Vacant",
      value: vacant.length,
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
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${stat.iconBg} ${stat.iconColor}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Occupancy Rate */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-700">
            Occupancy Rate
          </h3>
          <span className="text-sm font-bold text-gray-900">
            {occupancyRate}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-black h-3 rounded-full transition-all duration-500"
            style={{ width: `${occupancyRate}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>{occupied.length} Occupied</span>
          <span>{vacant.length} Vacant</span>
        </div>
      </div>

      <RevenueChart occupied={occupied} />
    </div>
  );
};

export default OverviewPage;
