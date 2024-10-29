import React, { useCallback, useState } from "react";

import TabButton from "../../components/UI/TabButton";
import AddressTransactionTab from "./AddressTransaction/AddressTransactionTab";
import InternalTransaction from "../Transaction/InternalTransaction";

const TABS = [
  { id: 1, label: "Transactions", value: "transaction" },
  { id: 3, label: "Internal Txs", value: "internalTxs" },
  { id: 2, label: "Token Transfers", value: "tokenTransfers" },
  { id: 4, label: "NFT Transfers", value: "nftTransfer" },
  { id: 5, label: "Assets", value: "assets" },
  { id: 6, label: "Ens", value: "ens" },
  { id: 7, label: "Blocks", value: "blocks" },
];

const AddressSection = ({ transactions }) => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "transaction") {
      return <AddressTransactionTab transactions={transactions} />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction />;
    }
  }, [activeTab, transactions]);

  return (
    <div>
      <div className="flex mt-3">
        <TabButton
          defaultActiveKey={activeTab}
          items={TABS}
          onTabButtonClick={onTabButtonClick}
        />
      </div>
      <div>{getActiveTabContent()}</div>
    </div>
  );
};

export default AddressSection;
