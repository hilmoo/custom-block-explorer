import React, { useCallback, useState } from "react";
import AddressContractVerifiedCode from "../AddressContractVerifiedTab/AddressContractVerifiedCode";
import TabButton from "../../../components/UI/TabButton";
import Divider from "../../../components/UI/Divider";
import AddressContractVerifiedReadFunction from "../AddressContractVerifiedTab/AddressContractVerifiedReadFunction";
import AddressContractVerifiedWriteFunction from "../AddressContractVerifiedTab/AddressContractVerifiedWriteFunction";

const TABS = [
  { id: 1, label: "Code", value: "code" },
  { id: 2, label: "Read Functions", value: "readFunctions" },
  { id: 3, label: "Write Functions ", value: "writeFunctions" },
];

const AddressContractVerified = ({ creationCode, abi, deploymentCode }) => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  console.log({ activeTab });

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "code") {
      return (
        <AddressContractVerifiedCode
          creationCode={creationCode}
          abi={abi}
          deploymentCode={deploymentCode}
        />
      );
    } else if (activeTab === "readFunctions") {
      return <AddressContractVerifiedReadFunction />;
    } else if (activeTab === "writeFunctions") {
      return <AddressContractVerifiedWriteFunction />;
    }
  }, [activeTab, creationCode, abi, deploymentCode]);

  return (
    <div>
      <div className="flex mt-3">
        <TabButton
          defaultActiveKey={activeTab}
          items={TABS}
          onTabButtonClick={onTabButtonClick}
        />
      </div>
      {/* <Divider /> */}

      <div className="mx-3 my-3">{getActiveTabContent()}</div>
    </div>
  );
};

export default AddressContractVerified;
