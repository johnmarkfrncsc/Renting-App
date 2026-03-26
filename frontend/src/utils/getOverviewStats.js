const getOverviewStats = (properties) => {
  const totalProperties = properties.length;
  const occupiedProperties = properties.filter(
    (p) => p.rentStatus === "occupied",
  );
  const vacantProperties = properties.filter((p) => p.rentStatus === "vacant");

  const totalRevenue = occupiedProperties.reduce(
    (sum, p) => sum + p.rentPrice,
    0,
  );

  const occupancyRate =
    totalProperties > 0
      ? Math.round((occupiedProperties.length / totalProperties) * 100)
      : 0;

  const recentProperties = [...properties]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return {
    totalProperties,
    occupiedProperties,
    vacantProperties,
    totalRevenue,
    occupancyRate,
    recentProperties,
  };
};

export default getOverviewStats;
