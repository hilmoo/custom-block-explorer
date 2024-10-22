import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

const AddresssTransactionSummary = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-5">
      <div className="flex flex-col mt-3">
        <div className="flex items-center">
          <span>Total transfer-out txns</span>
          <InformationCircleIcon className="ml-1 w-3 h-3" />
        </div>
        <span className="text-lg font-bold">815.23K</span>
        <span className="font-bold text-gray-500">89.71K ETH</span>
      </div>

      <div className="flex flex-col mt-3">
        <div className="flex items-center">
          <span>Total transfer-in txns</span>
          <InformationCircleIcon className="ml-1 w-3 h-3" />
        </div>
        <span className="text-lg font-bold">9.1K</span>
        <span className="font-bold text-gray-500">527.5779 ETH</span>
      </div>
    </div>
  );
};

export default AddresssTransactionSummary;
