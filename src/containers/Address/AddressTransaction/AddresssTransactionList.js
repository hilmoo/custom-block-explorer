import React, { useMemo } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const DATA = [
  {
    txnHash:
      "0xe1a102f3eb13f8c3f696f6028635847d700fe13df9522bbb4c7f1bd0d19c2126",
    method: "ETH transfer",
    block: 21023598,
    dateTime: "10/22/2024, 16:46:47",
    from: "titanbuilder.eth",
    to: "Lido. Execution...",
    amount: "-0.02674524 ETH",
    txnFee: "0.00018892 ETH",
  },
  {
    txnHash:
      "0x50e4b78285fdd33680a46ed912b702bfc96178f00e6c9923a1c9ed61e738a058",
    method: "ETH transfer",
    block: 21023594,
    dateTime: "10/22/2024, 16:45:59",
    from: "titanbuilder.eth",
    to: "0xe688...2cdb71127",
    amount: "-0.04004323 ETH",
    txnFee: "0.00017565 ETH",
  },
  {
    txnHash:
      "0xcc37211484cc3df0ef5be7ed7a5de74b0e6169d58dd5873969eedbbc0e07e902",
    method: "ETH transfer",
    block: 21023594,
    dateTime: "10/22/2024, 16:45:59",
    from: "titanbuilder.eth",
    to: "0xd895...e68296bf5",
    amount: "-0.00052849 ETH",
    txnFee: "0.00017565 ETH",
  },
  {
    txnHash:
      "0xbb4360eec7641bff45bdcb1dadec17e72839f70716988c908c4b891dcb02cba1",
    method: "ETH transfer",
    block: 21023593,
    dateTime: "10/22/2024, 16:45:47",
    from: "titanbuilder.eth",
    to: "Lido. Execution...",
    amount: "-0.04777484 ETH",
    txnFee: "0.00018703 ETH",
  },
  {
    txnHash:
      "0x7118629bc36d69c52ad86b990e33d3140c451f745f470faee355a95ce62f30dd",
    method: "ETH transfer",
    block: 21023592,
    dateTime: "10/22/2024, 16:45:35",
    from: "titanbuilder.eth",
    to: "0xe14b...1b6f51f6a",
    amount: "-0.03264693 ETH",
    txnFee: "0.00017012 ETH",
  },
  {
    txnHash:
      "0xb5dcc34f3c8d0bbc4a21aa2a9e7f797897ff353df469c22df66839d6c518670b",
    method: "ETH transfer",
    block: 21023592,
    dateTime: "10/22/2024, 16:45:35",
    from: "titanbuilder.eth",
    to: "0x965d...6cfb8141c",
    amount: "-0.00006111 ETH",
    txnFee: "0.00017012 ETH",
  },
  {
    txnHash:
      "0x01e2c5a053591acf356b014d785f15842807f5428977132ac31a9bb23e1dcfbe",
    method: "ETH transfer",
    block: 21023590,
    dateTime: "10/22/2024, 16:45:11",
    from: "titanbuilder.eth",
    to: "0xe688...2cdb71127",
    amount: "-0.05901825 ETH",
    txnFee: "0.00018008 ETH",
  },
  {
    txnHash:
      "0xf39c86a0526382e83fdf54587f4721428e6edb57750a556733ec93e94b1693f3",
    method: "ETH transfer",
    block: 21023590,
    dateTime: "10/22/2024, 16:45:11",
    from: "titanbuilder.eth",
    to: "0xb918...26135cccc",
    amount: "-0.00827198 ETH",
    txnFee: "0.00018008 ETH",
  },
  {
    txnHash:
      "0x1dfa6c1dba9706e96c496e5b9b3e60306c334a2e7994628a47c1255aa0e2c220",
    method: "ETH transfer",
    block: 21023587,
    dateTime: "10/22/2024, 16:44:35",
    from: "titanbuilder.eth",
    to: "Lido. Execution...",
    amount: "-0.05520061 ETH",
    txnFee: "0.00020362 ETH",
  },
  {
    txnHash:
      "0x361b1eec7281ace57b6923e5ecbd780254d0c52d5d085e9cd921d965f6189c7c",
    method: "ETH transfer",
    block: 21023585,
    dateTime: "10/22/2024, 16:44:11",
    from: "titanbuilder.eth",
    to: "0x22ee...6fa778",
    amount: "-0.0255586 ETH",
    txnFee: "0.00174345 ETH",
  },
  {
    txnHash:
      "0xe3523e41ddcb227dac383b2b1a75624c5d322cbda2b9278b73c827bad50f58d8",
    method: "ETH transfer",
    block: 21023583,
    dateTime: "10/22/2024, 16:43:47",
    from: "titanbuilder.eth",
    to: "KuCoin. Hot Wallet_6",
    amount: "-0.07277204 ETH",
    txnFee: "0.00019876 ETH",
  },
  {
    txnHash:
      "0x42b98c180013ef8377ecfd57139d784ebda2680b5db219324fb0e6db2e49e28d",
    method: "ETH transfer",
    block: 21023580,
    dateTime: "10/22/2024, 16:43:11",
    from: "titanbuilder.eth",
    to: "0x46f4...cb96dd361",
    amount: "-0.11861403 ETH",
    txnFee: "0.00018041 ETH",
  },
  {
    txnHash:
      "0x059bec1356c8d6bf6dda9f43e113fc941f4d65a89b663ddeb552cb79847769ef",
    method: "ETH transfer",
    block: 21023580,
    dateTime: "10/22/2024, 16:43:11",
    from: "titanbuilder.eth",
    to: "0x199a...4dcc476cd",
    amount: "-0.00007514 ETH",
    txnFee: "0.00018041 ETH",
  },
  {
    txnHash:
      "0xc34ecafcfd9155f7e4e868c2bab164e7da4d17fda5c8b19030aca42b60795c9c",
    method: "ETH transfer",
    block: 21023578,
    dateTime: "10/22/2024, 16:42:47",
    from: "titanbuilder.eth",
    to: "Lido. Execution...",
    amount: "-0.07721291 ETH",
    txnFee: "0.00020883 ETH",
  },
  {
    txnHash:
      "0x30cda890c2b41dacc7045fa4514254bd19b2b0adce089e497836aa5f40d1ad89",
    method: "ETH transfer",
    block: 21023577,
    dateTime: "10/22/2024, 16:42:35",
    from: "titanbuilder.eth",
    to: "0xe0e8...d3e4ed1",
    amount: "-0.04764402 ETH",
    txnFee: "0.00028523 ETH",
  },
];

const COLUMNS = [
  {
    title: "Txn hash",
    dataIndex: "txnHash",
    key: "txnHash",
    render: (hash) => (
      <Link className="text-[#1677ff]" to={`/tx/${hash}`}>
        {hash}
      </Link>
    ),
  },
  {
    title: "Method",
    dataIndex: "method",
    key: "method",
  },
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    render: (blockNumber) => (
      <Link className="text-[#1677ff]" to={`/block/${blockNumber}`}>
        {blockNumber}
      </Link>
    ),
  },
  {
    title: "Date time",
    dataIndex: "dateTime",
    key: "dateTime",
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Txn fee",
    dataIndex: "txnFee",
    key: "txnFee",
    render: (text) => <span className="font-bold">{text}</span>,
  },
];

const AddresssTransactionList = () => {
  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>Total 108 calls with ETH transfer and contract creation</span>
        <span>Hide zero-amount txns</span>
      </div>

      <Table
        size="large"
        className="mt-4"
        columns={COLUMNS}
        dataSource={DATA}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default AddresssTransactionList;
