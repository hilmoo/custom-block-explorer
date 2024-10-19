import React, { lazy } from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("../pages/Home"));

const { Header, Content, Footer } = Layout;

const NAVBAR = [
  {
    key: "",
    label: "Home",
  },
  {
    key: "tx",
    label: "Blockchain",
    children: [
      {
        key: "txs",
        label: "Transactions",
      },
      { key: "large-txs", label: "Large Txs" },
      { key: "pending-txs", label: "Pending Txs" },
    ],
  },
  {
    key: "tk",
    label: "Token",
    children: [
      {
        key: "token",
        label: "Token List",
      },
      { key: "nft", label: "NFT list" },
    ],
  },
  {
    key: "dev",
    label: "Developers",
    children: [
      {
        key: "api",
        label: "APIs",
      },
      { key: "documentations", label: "API Documentation" },
    ],
  },
];

const AppLayout = () => {
  const navigate = useNavigate();

  const handleMenuClick = (item) => {
    navigate(item.key); // Navigate to the clicked route
  };
  return (
    <Layout className="font-varela">
      <Header className="flex sticky w-100 align-item-center z-1 top-0">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={NAVBAR}
          className="flex-1 min-w-0"
          onClick={handleMenuClick}
        />
      </Header>
      <Content className="xl:px-50 lg:px-32 md:px-16 sm:px-6 min-h-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Content>
      <Footer className="text-center">
        Block Explorer ©2024 Created with React
      </Footer>
    </Layout>
  );
};

export default AppLayout;
