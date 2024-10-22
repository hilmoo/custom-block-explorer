import React, { useMemo } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const DATA = {
  key: "1",
  block: 1,
  validator: "Mike",
  date: Date.now(),
  age: 32,
  txs: 123,
  blockSize: 4854,
  gasUsed: 234,
  gasLimit: 234,
  gasPrice: 12,
  blockRewards: 10,
};

const COLUMNS = [
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    render: (txHash) => (
      <Link className="text-[#1677ff]" to={`/tx/${txHash}`}>
        {txHash}
      </Link>
    ),
  },
  {
    title: "Date time",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Validator",
    dataIndex: "validator",
    key: "validator",
    render: (text) => <span className="font-bold">{text}</span>,
  },
  {
    title: "Txns",
    dataIndex: "txs",
    key: "txs",
  },
  {
    title: "Block size",
    dataIndex: "blockSize",
    key: "blockSize",
  },
  {
    title: "Gas used",
    dataIndex: "gasUsed",
    key: "gasUsed",
  },
  {
    title: "Gas limit",
    dataIndex: "gasLimit",
    key: "gasLimit",
  },
  {
    title: "Avg. Gas price",
    dataIndex: "gasPrice",
    key: "gasPrice",
    render: (text) => <span className="font-bold">{text}</span>,
  },
  {
    title: "Block rewards",
    dataIndex: "blockRewards",
    key: "blockRewards",
  },
];

const Transactions = () => {
  const dataSource = useMemo(() => {
    let data = [];

    for (let i = 0; i <= Math.random() * 1000; i++) {
      data.push({ ...DATA, key: i });
    }

    return data;
  }, []);
  return (
    <div className="p-6">
      <h1 className="ml-2 font-varela font-bold text-xl mx-auto">Large txns</h1>
      <div className="mt-10 p-2">
        <h4>
          Total 1,185,874 transactions within the latest 24 hours (Shows recent
          10,000 data only)
        </h4>
        <Table
          size="large"
          className="mt-4"
          columns={COLUMNS}
          dataSource={dataSource}
          pagination={{
            position: "bottom-right",
          }}
        />
      </div>
    </div>
  );
};

export default Transactions;
