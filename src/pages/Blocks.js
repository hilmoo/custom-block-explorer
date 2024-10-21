import React from "react";
import Title from "../components/UI/Title";
import { Table } from "antd";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const Blocks = () => {
  return (
    <div className="p-6">
      <Title>Block list (after Merge)</Title>

      <div>
        <Table dataSource={dataSource} columns={columns} size="small" />
      </div>
    </div>
  );
};

export default Blocks;
