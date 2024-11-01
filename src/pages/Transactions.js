import React, { useEffect, useMemo, useState } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

import { useLatestTransactions } from "../hooks";
import { getTotalTxFromDB, getTxsFees } from "../helpers";
import {
  bnToCurrency,
  getCurrencyInEth,
  roundUpNumber,
  truncateAddress,
} from "../utils";

const COLUMNS = [
  {
    title: "Tx Hash",
    dataIndex: "hash",
    key: "hash",
    render: (hash) => (
      <Link className="text-blue-500" to={`/tx/${hash}`}>
        {truncateAddress(hash, 10)}
      </Link>
    ),
  },
  {
    title: "Method",
    dataIndex: "data",
    key: "data",
    render: (address) => (
      <span className="font-bold">{truncateAddress(address)}</span>
    ),
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
    render: (address) => (
      <Link to={`/address/${address}`} className="text-blue-500">
        {truncateAddress(address)}
      </Link>
    ),
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
    render: (address, data) => (
      <Link
        to={`/address/${!!address ? address : data.creates}`}
        className="text-blue-500"
      >
        {!!address ? truncateAddress(address) : "Create: Contract"}
      </Link>
    ),
  },
  {
    title: "Amount",
    dataIndex: "value",
    key: "value",
    render: (value) => (
      <span className="font-bold">{roundUpNumber(bnToCurrency(value))}</span>
    ),
  },
  {
    title: "Txn fee",
    dataIndex: "txsFee",
    key: "txsFee",
    render: (_, tx) => (
      <span className="font-bold">
        {roundUpNumber(getCurrencyInEth(getTxsFees(tx))) + " ETH"}
      </span>
    ),
  },
];

const Transactions = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalTx, setTotalTx] = useState(0);

  const { transactions } = useLatestTransactions(pageNumber);

  useEffect(() => {
    const fetchTotalTx = async () => {
      const txCount = await getTotalTxFromDB();
      setTotalTx(txCount);
    };

    fetchTotalTx();
  }, [pageNumber]);

  const onTableChange = (pagination) => {
    setPageNumber(() => pagination.current);
  };

  return (
    <div className="p-6">
      <h1 className="ml-2 font-varela font-bold text-xl mx-auto">
        Latest Transactions
      </h1>
      <div className="mt-10 p-2">
        <h4>Total {totalTx} transactions</h4>
        <Table
          size="large"
          className="mt-4 overflow-x-scroll"
          columns={COLUMNS}
          dataSource={transactions || []}
          onChange={onTableChange}
          pagination={{
            position: "bottom-right",
            current: pageNumber,
            pageSize: 10,
            total: totalTx,
          }}
        />
      </div>
    </div>
  );
};

export default Transactions;
