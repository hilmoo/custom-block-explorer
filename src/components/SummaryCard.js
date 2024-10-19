import React from "react";
import StatsCard from "./UI/StatsCard";

const SUMMARY = [
  { key: "marketcap", label: "Market Cap", value: "$319.03B" },
  {
    key: "totaltxns",
    label: "Total txns",
    value: "2.55B",
    unit: "txns",
    link: "/eth/tx-list",
  },
  {
    key: "avgGasPrice",
    label: "Avg. Gas price",
    value: "34.9839",
    unit: "Gwei",
  },
  {
    key: "ethStaked",
    label: "ETH total staked",
    value: "34.64M",
    link: "/eth/deposits-list",
  },
  { key: "txnVolume", label: "24h txn volume", value: "1.61M", unit: "ETH" },
  { key: "blockHeight", label: "Block height", value: "20993917" },
];

const SummaryCard = () => {
  return (
    <div className="p-4 rounded-lg border w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y md:divide-y-0 md:divide-x divide-gray-200">
        {SUMMARY.map((item, index) => (
          <StatsCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SummaryCard;
