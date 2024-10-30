import React from "react";
import Tooltip from "../../components/UI/Tooltip";

const ContractInfo = ({}) => {
  return (
    <div>
      <h1 className="mt-5 font-varela font-bold text-lg mx-auto">
        Contract info
      </h1>

      <div>
        <Tooltip text="The address which created the contract, and the transaction hash of the creation">
          <span className="cursor-pointer text-gray-500">Contract creator</span>
        </Tooltip>

        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">
              0x785f...43cfc6e6801 created at 0xaac281dbf3fbbb
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="cursor-pointer text-gray-500">Token Tracker</span>
        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate"> ETH</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInfo;
