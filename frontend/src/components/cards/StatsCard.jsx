const StatsCard = ({ label, value, icon, iconBg, iconColor }) => {
  return (
    <div className="relative bg-white border border-gray-200 rounded-2xl p-3 text-center shadow-lg">
      <div
        className={`absolute -bottom-4 -left-2 w-12 h-12 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>

      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
    </div>
  );
};

export default StatsCard;
