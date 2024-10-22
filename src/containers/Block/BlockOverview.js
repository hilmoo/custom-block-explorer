import React from "react";
import ListItem from "../../components/UI/ListItem";

const OVERVIEW = [
  {
    id: "block_hash",
    label: "Block hash",
    value: "0x9e6abbbfdb95b88c5eeed0fa75f3d993a9565e29e2852fc82b0598b92758b9e4",
    type: "string",
  },
  {
    id: "confirmed",
    label: "Confirmed",
    value: "435",
    type: "number",
  },
  {
    id: "time",
    label: "Time",
    value: "10/21/2024, 15:04:11",
    type: "datetime",
  },
  {
    id: "time_ago",
    label: "Time Ago",
    value: "1 hr ago",
    type: "string",
  },
  {
    id: "transactions",
    label: "Transactions",
    value: "155 txns, 766 internal txns, 184 token transfers",
    type: "string",
  },
  {
    id: "withdrawal_txn",
    label: "Withdrawal txn",
    value: "16 withdrawal transaction(s)",
    type: "string",
  },
  {
    id: "validator",
    label: "Validator",
    value: "titanbuilder.eth",
    type: "string",
  },
  {
    id: "block_rewards",
    label: "Block rewards",
    value:
      "0.02922263266749372 ETH (0 ETH + 0.15965423159051395 ETH - 0.13043159892302023 ETH)",
    type: "string",
  },
  {
    id: "difficulty",
    label: "Difficulty",
    value: "58,750,003,716,598,352,816,469",
    type: "number",
  },
  {
    id: "block_size",
    label: "Block size",
    value: "66,306 bytes",
    type: "string",
  },
  {
    id: "gas_used",
    label: "Gas used",
    value: "14,535,848 (48.45%)",
    type: "string",
  },
  {
    id: "gas_target",
    label: "Gas target",
    value: "-3.09%",
    type: "string",
  },
  {
    id: "gas_limit",
    label: "Gas limit",
    value: "30,000,000",
    type: "number",
  },
  {
    id: "avg_gas_price",
    label: "Avg. Gas price",
    value: "0.000000010983482462 ETH (10.98348246 Gwei)",
    type: "string",
  },
  {
    id: "base_fee_per_gas",
    label: "Base fee per Gas",
    value: "0.000000008973098709 ETH (8.9730987 Gwei)",
    type: "string",
  },
  {
    id: "burned_fee",
    label: "Burned fee",
    value: "0.13043159892302023 ETH",
    type: "string",
  },
  {
    id: "additional_data",
    label: "Additional data",
    value:
      "Titan (titanbuilder.xyz) (0x546974616e2028746974616e6275696c6465722e78797a29)",
    type: "string",
  },
  {
    id: "blob_txn",
    label: "Blob txn",
    value: "0 Blob transaction(s)",
    type: "string",
  },
  {
    id: "parent_block_hash",
    label: "Parent block hash",
    value: "0x3969989908e32a597670814499f4bb702991a6ad5be56d8fffdae674592ee4bb",
    type: "string",
  },
  {
    id: "state_root",
    label: "State root",
    value: "0xf2e9b99f8736b204154f428a3657b3efa1e624ede0585343161858549244eb04",
    type: "string",
  },
  {
    id: "withdrawals_root",
    label: "Withdrawals Root",
    value: "0x8e6cf2d3d9e8f0d379476f431b6ee5e81bfa1af2ab4c931fe7aca41cd861ca3b",
    type: "string",
  },
  {
    id: "nonce",
    label: "Nonce",
    value: "0",
    type: "number",
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
