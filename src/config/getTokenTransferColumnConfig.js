import { getTransactionColumnConfig } from "./getTransactionColumnConfig";

export const getTokenTransferColumnConfig = () => {
  return [
    ...getTransactionColumnConfig(["txsFee"]),
    {
      title: "Token",
      dataIndex: "tokenAddress",
      key: "tokenAddress",
    },
  ];
};
