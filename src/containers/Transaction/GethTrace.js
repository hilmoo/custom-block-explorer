import React, { useMemo } from "react";
import { Table } from "antd";

const DATA = {
  key: "1",
  step: 2,
  pc: 0,
  operation: "PUSH1",
  gasLimit: 1001,
  gasCost: 34,
  depth: 1,
};

const COLUMNS = [
  {
    title: "Step",
    dataIndex: "step",
    key: "step",
  },
  {
    title: "PC",
    dataIndex: "pc",
    key: "pc",
  },
  {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
    render: (text) => <span className="font-bold">{text}</span>,
  },
  {
    title: "Gas limit",
    dataIndex: "gasLimit",
    key: "gasLimittxs",
  },
  {
    title: "Gas Cost",
    dataIndex: "gasCost",
    key: "gasCost",
  },
  {
    title: "Depth",
    dataIndex: "depth",
    key: "depth",
  },
];

const GethTraces = () => {
  const dataSource = useMemo(() => {
    let data = [];

    for (let i = 0; i <= Math.random() * 1000; i++) {
      data.push({ ...DATA, key: i });
    }

    return data;
  }, []);

  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>Total 211 steps</span>
      </div>

      <Table
        size="large"
        className="mt-4 overflow-x-scroll"
        columns={COLUMNS}
        dataSource={dataSource}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default GethTraces;
