import React from "react";
import { ArrowDownRightIcon } from "@heroicons/react/24/solid";

import BlockCard from "./UI/BlockCard";

const BlockListCard = () => {
  const blocks = [
    {
      blockNumber: "20993917",
      timeAgo: "2 hr ago",
      producer: "0x51a1...99221712de97",
      producerLink: "/eth/address/0x51a1449b3b6d635eddec781cd47a99221712de97",
      txns: "110 txns",
      reward: "0.02352081 ETH",
      gasPrice: "20.35 Gwei",
      blockLink: "/eth/block/20993917",
    },
    // Add other blocks similarly...
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-1 md:grid-cols-2">
      {/* Block List Section */}
      <div className="">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Blocks</h3>
          <a href="/eth/block-list" className="text-blue-500 flex items-center">
            <ArrowDownRightIcon className="ml-2" />
          </a>
        </div>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <BlockCard key={index} {...block} />
          ))}
        </div>
      </div>

      {/* Large Transactions Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Large Transactions</h3>
          <a
            href="/eth/tx-list/large"
            className="text-blue-500 flex items-center"
          >
            Show all
            <i className="ml-2 iconfont okds-arrow-pointer-right-md"></i>
          </a>
        </div>

        <div className="space-y-4">
          {blocks.map((block, index) => (
            <BlockCard key={index} {...block} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockListCard;
