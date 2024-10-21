import React from "react";

import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";

const ListItem = ({ label, value, info = "", withTooltip = false }) => {
  return (
    <div className="grid grid-cols-5 gap-4 p-2">
      {withTooltip ? (
        <div className="flex justify-center items-center h-screen">
          <Tooltip text={info}>
            <span className="cursor-pointer text-blue-500 underline">
              {value}
            </span>
          </Tooltip>
        </div>
      ) : (
        <div className="col-span-5 sm:col-span-1">
          <div className="font-bold text-gray-600">{label}:</div>
        </div>
      )}
      <div className="col-span-5 sm:col-span-4">
        <div className="flex items-center space-x-2">
          <div className="truncate">{value}</div>
          <div className="cursor-pointer">
            <DocumentDuplicateIcon className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
