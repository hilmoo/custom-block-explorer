import React, { useMemo } from "react";
import { Table } from "antd";
import { getTokenTransferColumnConfig } from "../../../config";

const AddressTokenTransfers = ({ transactions }) => {
  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>
          From 0x4838...77bf73ce8b0bad5f97 To 0xe082...83a622fb5eadc92a Total 0
          calls with ETH transfer and contract creation
        </span>
      </div>

      <Table
        size="large"
        className="mt-4 overflow-x-scroll"
        columns={[...getTokenTransferColumnConfig()]}
        dataSource={transactions}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default AddressTokenTransfers;
