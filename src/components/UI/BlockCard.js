import React from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import relativeTime from "dayjs/plugin/relativeTime";
import { BanknotesIcon, Square2StackIcon } from "@heroicons/react/24/solid";

import { truncateAddress } from "../../utils";
import { ethers } from "ethers";

dayjs.extend(relativeTime);

const ListCard = ({
  blockNumber,
  timeStamp,
  producer,
  totalGasFees,
  averageGasPrice,
  txns,
  txValue = "",
  txhash = "",
  txFrom = "",
  txTo = "",
  isTransaction = false,
}) => {
  return (
    <div className="p-2 rounded-lg">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="row-span-3 justify-center items-center hidden md:block">
          <Square2StackIcon className="w-10 h-10" />
        </div>
        <div className="">
          {!isTransaction ? (
            <Link
              to={`/block/${blockNumber}`}
              className="text-blue-500 font-bold"
            >
              {blockNumber}
            </Link>
          ) : (
            <Link to={`/tx/${txhash}`} className="text-blue-500 font-bold">
              {truncateAddress(txhash)}
            </Link>
          )}
          <div className="text-gray-500">
            {dayjs().to(dayjs.unix(timeStamp))}
          </div>
        </div>

        {!isTransaction ? (
          <div className="col-span-2">
            <div className="text-gray-700">
              <span className="font-semibold text-xs">Producer: </span>
              <Link
                to={`/address/${producer}`}
                className="text-blue-500 truncate"
              >
                {truncateAddress(producer)}
              </Link>
            </div>
            <div className="flex ">
              <span className="font-bold">{txns} &nbsp;</span>
              <div className="text-gray-500">
                <span className="font-semibold"> Reward: </span>
                {totalGasFees} ETH
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-2">
            <div className="text-gray-700">
              <span className="font-semibold">From: &nbsp;</span>
              <Link
                to={`/address/${txFrom}`}
                className="text-blue-500 truncate"
              >
                {truncateAddress(txFrom)}
              </Link>
            </div>
            <div className="flex ">
              <span className="font-semibold">To: &nbsp;</span>
              <Link
                href={`/address/${txTo}`}
                className="text-blue-500 truncate"
              >
                {truncateAddress(txTo)}
              </Link>
            </div>
          </div>
        )}

        <div className="flex col-span-2 justify-start items-start sm:justify-center sm:items-center">
          <div className="flex items-center h-fit bg-[#e1dede6b] rounded">
            {!isTransaction && <BanknotesIcon className="w-4 h-4" />}
            {!isTransaction ? (
              <span className="ml-2 font-extrabold">
                {`${averageGasPrice} Gwei`}
              </span>
            ) : (
              <span className="ml-2 font-extrabold">
                {`${ethers.utils.formatUnits(txValue, "ether")} Eth`}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
