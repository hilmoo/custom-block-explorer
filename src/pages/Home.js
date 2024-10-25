import React, { useMemo } from "react";

import { getGasPriceAndRewards } from "../helpers";
import BlockListSection from "../containers/Home/BlockList";
import SummarySection from "../containers/Home/SummarySection";
import { useLatestBlocks, useLatestTransactions } from "../hooks";

const Home = () => {
  const { blocks } = useLatestBlocks();
  const { transactions } = useLatestTransactions();

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

  const txData = useMemo(() => {
    let data = [];

    transactions.map((tx) => {
      data.push({
        timeStamp: tx.timestamp,
        txValue: tx.value,
        txhash: tx.hash,
        txFrom: tx.from,
        txTo: tx.to,
      });
    });

    return data;
  }, [transactions]);

  return (
    <div className="p-6">
      <SummarySection />
      <BlockListSection blocks={blockData || []} transactions={txData} />
    </div>
  );
};

export default Home;
