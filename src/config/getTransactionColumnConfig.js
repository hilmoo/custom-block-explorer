import { Link } from "react-router-dom";

import {
  bnToCurrency,
  getCurrencyInEth,
  roundUpNumber,
  truncateAddress,
} from "../utils";
import { getTxsFees } from "../helpers";

export const getTransactionColumnConfig = (skip = []) => {
  const COLUMNS = [
    {
      title: "Tx Hash",
      dataIndex: "hash",
      key: "hash",
      render: (hash) => (
        <Link className="text-[#1677ff]" to={`/tx/${hash}`}>
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
        <span className="font-bold">{truncateAddress(address)}</span>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (address) => (
        <span className="font-bold">
          {!!address ? truncateAddress(address) : "Create: Contract"}
        </span>
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

  const tableColumns = COLUMNS.filter(({ key }) => !skip.includes(key));

  return tableColumns;
};
