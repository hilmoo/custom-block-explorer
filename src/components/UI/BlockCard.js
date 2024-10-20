import { BanknotesIcon, Square2StackIcon } from "@heroicons/react/24/solid";
import React from "react";

const ListCard = ({
  blockLink,
  blockNumber,
  timeAgo,
  producerLink,
  producer,
  reward,
  gasPrice,
  txns,
  isTransaction = false,
}) => {
  return (
    <div className="p-2 rounded-lg">
      <div class="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="row-span-3 justify-center items-center hidden md:block">
          <Square2StackIcon className="w-10 h-10" />
        </div>
        <div className="">
          <a href={blockLink} className="text-blue-500 font-bold">
            {blockNumber}
          </a>
          <div className="text-gray-500">{timeAgo}</div>
        </div>

        {!isTransaction ? (
          <div className="col-span-3">
            <div className="text-gray-700">
              <span className="font-semibold">Producer: </span>
              <a href={producerLink} className="text-blue-500 truncate">
                {producer}
              </a>
            </div>
            <div className="flex ">
              <span className="font-bold">{txns} &nbsp;</span>
              <div className="text-gray-500">
                <span className="font-semibold"> Reward: </span>
                {reward}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-3">
            <div className="text-gray-700">
              <span className="font-semibold">From: &nbsp;</span>
              <a href={producerLink} className="text-blue-500 truncate">
                {producer}
              </a>
            </div>
            <div className="flex ">
              <span className="font-semibold">To: &nbsp;</span>
              <a href={producerLink} className="text-blue-500 truncate">
                {producer}
              </a>
            </div>
          </div>
        )}

        <div className="flex justify-start items-start sm:justify-center sm:items-center">
          <div className="flex items-center h-fit bg-[#e1dede6b] rounded">
            {!isTransaction && <BanknotesIcon className="w-4 h-4" />}
            <span className="ml-2 font-extrabold"> {gasPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
