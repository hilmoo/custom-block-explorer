import React from "react";
import Tooltip from "../../components/UI/Tooltip";

const MoreInfo = () => {
  return (
    <div>
      <h1 className="mt-5 font-varela font-bold text-lg mx-auto">Txn info</h1>

      <div>
        <Tooltip text="The total transactions initiated by this address and the sum of transaction fees. Only “Transactions”, token transfers, and NFT transfers are counted.">
          <span className="cursor-pointer text-gray-500">
            Total txns initiated
          </span>
        </Tooltip>

        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">$35.5</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="cursor-pointer text-gray-500">Latest txn sent</span>
        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">
              0xa6dea035eca6cca891c4bfaf0de53c79b9635bcafc6b16539540f1dc5dd609b8
              10/22/2024, 13:46:23
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="cursor-pointer text-gray-500">First txn sent</span>
        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">
              0xb5b9e8281c99d88258931da08a67650a40684d9d81d3c01d759b1442a0734e85
              04/04/2023, 13:08:23
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
