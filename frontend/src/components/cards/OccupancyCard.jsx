const OccupancyCard = ({ rate, occupied, vacant }) => {
  return (
    <div className="border border-base-300 rounded-xl p-6 shadow-sm mb-6 bg-base-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-base-content">
          Occupancy Rate
        </h3>
        <span className="text-sm font-bold text-base-content">{rate}%</span>
      </div>
      <div className="w-full bg-base-300 rounded-full h-3">
        <div
          className="bg-primary h-3 rounded-full transition-all duration-500"
          style={{ width: `${rate}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-base-content/60">
        <span>{occupied} Occupied</span>
        <span>{vacant} Vacant</span>
      </div>
    </div>
  );
};

export default OccupancyCard;
