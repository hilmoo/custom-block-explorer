import React from "react";

import SummarySection from "../containers/Home/SummarySection";
import BlockListSection from "../containers/Home/BlockList";

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

const Home = () => {
  return (
    <div className="p-6">
      <SummarySection />

      <BlockListSection blocks={blocks} />
    </div>
  );
};

export default Home;
