import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import Divider from "../components/UI/Divider";
import TabButton from "../components/UI/TabButton";
import TransactionOverview from "../containers/Transaction/TransactionOverview";
import TransactionState from "../containers/Transaction/TransactionState";
import InternalTransaction from "../containers/Transaction/InternalTransaction";
import GethTraces from "../containers/Transaction/GethTrace";
import ParityTrace from "../containers/Transaction/ParityTrace";

const TABS = [
  { id: 1, label: "Overview", value: "overview" },
  { id: 2, label: "State", value: "state" },
  { id: 3, label: "Internal Txs", value: "internalTxs" },
  { id: 4, label: "Geth traces", value: "gethTrace" },
  { id: 5, label: "Parity traces", value: "paratyTrace" },
];

const Transaction = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const { hash } = useParams();

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "overview") {
      return <TransactionOverview />;
    } else if (activeTab === "state") {
      return <TransactionState />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction />;
    } else if (activeTab === "gethTrace") {
      return <GethTraces />;
    } else {
      return <ParityTrace />;
    }
  }, [activeTab]);

  return (
    <div className="p-6">
      <div>
        <div className="grid font-varela">
          <span className="col-span-16 font-bold text-lg">
            Transaction details
          </span>
          <span className="col-span-16 mx-1 my-3">Txn Hash: {hash}</span>
        </div>

        <Divider />

        <div className="flex mt-3">
          <TabButton
            defaultActiveKey={activeTab}
            items={TABS}
            onTabButtonClick={onTabButtonClick}
          />
        </div>

        <div>{getActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default Transaction;
