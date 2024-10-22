import React from "react";
import ListItem from "../../components/UI/ListItem";

const OVERVIEW = [
  {
    label: "Status",
    value: "Success",
    type: "string",
  },
  {
    label: "Block",
    value: 21022356,
    type: "number",
  },
  {
    label: "Confirmations",
    value: 11,
    type: "number",
  },
  {
    label: "Timestamp",
    value: "10/22/2024, 12:36:59",
    type: "datetime",
  },
  {
    label: "Time Ago",
    value: "2 min ago",
    type: "string",
  },
  {
    label: "From Address",
    value: "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97",
    type: "string",
  },
  {
    label: "From ENS",
    value: "titanbuilder.eth",
    type: "string",
  },
  {
    label: "To Address",
    value: "0xe082b284a7e3ccee3765c29283a622fb5eadc92a",
    type: "string",
  },
  {
    label: "Amount",
    value: 0.055624924205467283,
    type: "number",
  },
  {
    label: "Amount in USD",
    value: 145.66,
    type: "number",
  },
  {
    label: "Transaction Fee",
    value: 0.000491785841946986,
    type: "number",
  },
  {
    label: "Transaction Fee in USD",
    value: 1.28,
    type: "number",
  },
  {
    label: "Gas Price",
    value: 0.000000015803902627,
    type: "number",
  },
  {
    label: "Gas Price in Gwei",
    value: 15.803902627,
    type: "number",
  },
  {
    label: "Gas Limit",
    value: 31118,
    type: "number",
  },
  {
    label: "Gas Usage",
    value: 31118,
    type: "number",
  },
  {
    label: "Gas Usage Percentage",
    value: "100%",
    type: "string",
  },
  {
    label: "Base Gas Fee",
    value: "15.803902627 Gwei",
    type: "string",
  },
  {
    label: "Max Gas Fee",
    value: "15.803902627 Gwei",
    type: "string",
  },
  {
    label: "Max Priority Gas Fee",
    value: "0 Gwei",
    type: "string",
  },
  {
    label: "Burnt Fee",
    value: 0.000491785841946986,
    type: "number",
  },
  {
    label: "Burnt Fee in USD",
    value: 1.29,
    type: "number",
  },
  {
    label: "Transaction Savings",
    value: 0,
    type: "number",
  },
  {
    label: "Transaction Savings in USD",
    value: 0,
    type: "number",
  },
  {
    label: "Transaction Type",
    value: "2 (A transaction type initiated by EIP-1559)",
    type: "string",
  },
  {
    label: "Nonce",
    value: 817785,
    type: "number",
  },
  {
    label: "Position in Block",
    value: 151,
    type: "number",
  },
  {
    label: "Input Data",
    value: "0x",
    type: "string",
  },
];
const BlockTransaction = () => {
  return (
    <div className="mt-4 p-4">
      {OVERVIEW.map((data) => {
        return (
          <ListItem
            {...data}
            withTooltip={data.label.length > 5}
            info={data.label}
          />
        );
      })}
    </div>
  );
};

export default BlockTransaction;
