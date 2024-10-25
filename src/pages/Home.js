import React, { useMemo } from "react";

import { getGasPriceAndRewards } from "../helpers";
import BlockListSection from "../containers/Home/BlockList";
import SummarySection from "../containers/Home/SummarySection";
import {
  useLatestBlocks,
  useLatestTransactions,
  useBlockchainStats,
} from "../hooks";
import { roundUpNumber } from "../utils";

const Home = () => {
  const { blocks } = useLatestBlocks();
  const { transactions } = useLatestTransactions();
  const {
    blockHeight,
    avgGasPrice,
    cumulativeTxCount,
    txn24hVolume,
    txnCost24hVolume,
  } = useBlockchainStats();

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
      <SummarySection
        blockHeight={blockHeight}
        avgGasPrice={roundUpNumber(avgGasPrice)}
        cumulativeTxCount={cumulativeTxCount}
        txn24hVolume={txn24hVolume}
        txnCost24hVolume={roundUpNumber(txnCost24hVolume)}
      />
      <BlockListSection blocks={blockData || []} transactions={txData} />
    </div>
  );
};

export default Home;
