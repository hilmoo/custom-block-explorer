import React, { useCallback, useState } from "react";

import TabButton from "../../components/UI/TabButton";
import InternalTransaction from "../Transaction/InternalTransaction";
import AddressContractTab from "./AddressContract/AddressContractTab";
import AddressTransactionTab from "./AddressTransaction/AddressTransactionTab";
import Divider from "../../components/UI/Divider";

const TABS = [
  { id: 1, label: "Transactions", value: "transaction" },
  { id: 3, label: "Internal Txs", value: "internalTxs" },
  { id: 2, label: "Token Transfers", value: "tokenTransfers" },
  { id: 4, label: "Contracts", value: "contracts" },
  { id: 5, label: "Assets", value: "assets" },
];

const AddressContractSection = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "transaction") {
      return <AddressTransactionTab />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction />;
    } else if (activeTab === "contracts") {
      return <AddressContractTab />;
    }
  }, [activeTab]);

  return (
    <div>
      <div className="flex mt-3">
        <TabButton
          defaultActiveKey={activeTab}
          items={TABS}
          onTabButtonClick={onTabButtonClick}
        />
      </div>
      <Divider />

      <div className="mx-3 my-8">{getActiveTabContent()}</div>
    </div>
  );
};

export default AddressContractSection;
