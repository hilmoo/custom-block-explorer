import React, { useMemo } from "react";

import SummarySection from "../containers/Home/SummarySection";
import BlockListSection from "../containers/Home/BlockList";
import { useLatestBlocks } from "../hooks";
import { getGasPriceAndRewards } from "../helpers";

const blocks1 = [
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

const Home = () => {
  const { blocks, loading, error } = useLatestBlocks();

  console.log({ blocks, loading, error });

  const blockData = useMemo(() => {
    let data = [];

    blocks.map((block) => {
      data.push({
        blockNumber: block.number,
        timeStamp: block.timestamp,
        producer: block.miner,
        producerLink: "",
        txns: block.transactions.length,
        blockLink: ``,
        ...getGasPriceAndRewards(block),
      });
    });

    return data;
  }, [blocks]);

  return (
    <div className="p-6">
      <SummarySection />

      <BlockListSection blocks={blockData || []} transactions={blocks1} />
    </div>
  );
};

export default Home;
