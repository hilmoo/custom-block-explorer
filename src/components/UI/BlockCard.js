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
}) => {
  return (
    <div className="p-4 border rounded-lg bg-white shadow-md">
      <div className="flex justify-between">
        <a href={blockLink} className="text-blue-500 font-bold text-lg">
          {blockNumber}
        </a>
        <div className="text-gray-500">{timeAgo}</div>
      </div>

      <div className="flex justify-between mt-2">
        <div className="text-gray-700">
          <span className="font-semibold">Producer: </span>
          <a href={producerLink} className="text-blue-500 truncate">
            {producer}
          </a>
        </div>
        <div className="text-gray-700">{txns}</div>
      </div>

      <div className="flex justify-between mt-2">
        <div className="text-gray-700">
          <span className="font-semibold">Reward: </span>
          {reward}
        </div>
        <div className="text-gray-700">
          <i className="iconfont oklink-explorer-gas"></i>
          <span className="ml-2">{gasPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
