import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import BlockCard from "./UI/BlockCard";
import Title from "./UI/Title";

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
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 ">
      <div className="shadow-md border rounded p-6 max-h-[560px] overflow-hidden">
        <div className="flex justify-between items-center mb-4 px-2">
          <Title className="p-0 ml-2">Blocks</Title>
          <ArrowRightIcon className="ml-2 w-4 h-4" />
        </div>

        <div className="space-y-4 divide-y max-h-[560px] overflow-scroll">
          {blocks.map((block, index) => (
            <BlockCard key={index} {...block} />
          ))}
        </div>
      </div>

      <div className="shadow-md border rounded p-6 max-h-[560px] overflow-hidden">
        <div className="flex justify-between items-center mb-4 px-2">
          <Title className="p-0 ml-2">Transactions</Title>
          <ArrowRightIcon className="ml-2 w-4 h-4" />
        </div>

        <div className="space-y-4 divide-y max-h-[560px] overflow-scroll md:[overflow-anchor:none] sm:[overflow-anchor:none]">
          {blocks.map((block, index) => (
            <BlockCard key={index} {...block} isTransaction />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlockListCard;
