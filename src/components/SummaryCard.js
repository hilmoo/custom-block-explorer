import React from "react";
import StatsCard from "./UI/StatsCard";

const SummaryCard = ({
  blockHeight,
  avgGasPrice,
  cumulativeTxCount,
  txn24hVolume,
  txnCost24hVolume,
}) => {
  return (
    <div className="p-4 rounded-lg border w-full">
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        <StatsCard label="Block height" value={blockHeight} unit="" />
        <StatsCard
          label="Avg. Gas Price"
          value={avgGasPrice}
          unit="Gwei"
          link="/block-list"
        />
        <StatsCard
          label="Total transaction"
          value={cumulativeTxCount}
          unit="txns"
          link="/txs"
        />
        <StatsCard label="24 hr txs Volume" value={txn24hVolume} unit="tnx" />
        <StatsCard
          label="24 hr Eth Volume"
          value={txnCost24hVolume}
          unit="Eth"
        />
      </div>
    </div>
  );
};

export default SummaryCard;
