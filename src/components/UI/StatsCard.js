import React from "react";

const StatsCard = ({ label, value, unit = "", link = "" }) => {
  return (
    <div className="p-4 text-center">
      <h3 className="text-gray-600 font-semibold text-sm mb-2">{label}</h3>
      <div className="flex justify-center items-center space-x-2">
        {link ? (
          <a href={link} className="text-blue-500 underline flex items-center">
            <span className="font-bold text-xl">{value}</span>
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </a>
        ) : (
          <>
            <span className="font-bold text-xl">{value}</span>
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
