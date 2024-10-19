import React from "react";

const StatsCard = ({ label, value, unit = "", link = "" }) => {
  return (
    <div className="flex flex-col items-start justify-start border-b md:border-r last:border-r-0 p-4 font-varela w-full">
      <h3 className="text-gray-600 font-semibold text-sm mb-2">{label}</h3>
      <div className="flex items-center space-x-2">
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
