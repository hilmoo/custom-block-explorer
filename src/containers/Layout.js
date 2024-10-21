import React from "react";
import { Layout, Menu } from "antd";
import { useNavigate, Routes, Route } from "react-router-dom";

import routes from "../routes";
import PageNotFound from "../containers/PageContent";
import FooterComponent from "../components/UI/Footer";

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
    <Layout className="font-varela ">
      <Header className="flex sticky w-100 align-item-center z-1 top-0 bg-black text-white">
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={NAVBAR}
          className="flex-1 min-w-0 bg-black "
          onClick={handleMenuClick}
        />
      </Header>
      <Content className="xl:px-50 lg:px-32 md:px-16 sm:px-6 min-h-[calc(100vh-132px)]">
        <Routes>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} element={component} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Content>
      <Footer className="text-center bg-black text-white">
        <FooterComponent />
      </Footer>
    </Layout>
  );
};

export default AppLayout;
