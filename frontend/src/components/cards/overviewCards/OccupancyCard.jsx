import React from "react";

const OccupancyCard = ({ rate, occupied, vacant }) => {
  return (
    <div className=" border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Occupancy Rate</h3>
        <span className="text-sm font-bold text-gray-700">{rate}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-3">
        <div
          className="bg-indigo-600 h-3 rounded-full transition-all duration-500"
          style={{ width: `${rate}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>{occupied.length} Occupied</span>
        <span>{vacant.length} Vacant</span>
      </div>
    </div>
  );
};

export default OccupancyCard;
