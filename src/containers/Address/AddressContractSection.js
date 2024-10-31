import React, { useCallback, useState } from "react";

import TabButton from "../../components/UI/TabButton";
import InternalTransaction from "../Transaction/InternalTransaction";
import AddressContractTab from "./AddressContract/AddressContractTab";
import AddressTransactionTab from "./AddressTransaction/AddressTransactionTab";
import Divider from "../../components/UI/Divider";
import AddressTokenTransfers from "./AddressTransaction/AddressTokenTransfers";
import AddressNFTTransfers from "./AddressTransaction/AddressNFTTransfers";

const TABS = [
  { id: 1, label: "Transactions", value: "transaction" },
  { id: 2, label: "Token Transfers (ERC 20)", value: "tokenTransfers" },
  { id: 6, label: "NFT Transfers ", value: "nftTransfers" },
  { id: 4, label: "Contracts", value: "contracts" },
  { id: 3, label: "Internal Txs", value: "internalTxs", disabled: true },
  { id: 5, label: "Assets", value: "assets", disabled: true },
];

const AddressContractSection = ({
  transactions,
  tokenTransfers,
  nftTransfers,
  deploymentCode,
  creationCode,
  contractCreator,
  contractTxHash,
}) => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "transaction") {
      return <AddressTransactionTab transactions={transactions} />;
    } else if (activeTab === "tokenTransfers") {
      return <AddressTokenTransfers transactions={tokenTransfers} />;
    } else if (activeTab === "nftTransfers") {
      return <AddressNFTTransfers transactions={nftTransfers} />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction />;
    } else if (activeTab === "contracts") {
      return (
        <AddressContractTab
          creationCode={creationCode}
          deploymentCode={deploymentCode}
          contractTxHash={contractTxHash}
          contractCreator={contractCreator}
        />
      );
    }
  }, [
    activeTab,
    transactions,
    tokenTransfers,
    nftTransfers,
    contractCreator,
    contractTxHash,
    creationCode,
    deploymentCode,
  ]);

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
