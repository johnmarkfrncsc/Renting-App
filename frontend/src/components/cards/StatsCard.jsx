const StatsCard = ({ label, value, icon, iconBg, iconColor }) => {
  return (
    <div className="relative bg-base-200 border border-base-300 rounded-2xl p-3 text-center shadow-lg">
      <div
        className={`absolute -bottom-4 -left-2 w-12 h-12 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}
      >
        {icon}
      </div>
      <p className="text-xs text-base-content/60 mb-1">{label}</p>
      <p className="text-2xl font-bold text-base-content">{value}</p>
    </div>
  );
};

export default StatsCard;
