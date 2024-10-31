import React from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import CodeBlock from "../../../components/UI/CodeBlock";

const AddressContractVerified = ({ creationCode, abi, deploymentCode }) => {
  return (
    <div className="flex flex-col">
      <div className="flex text-center items-center my-2 text-black font-semibold">
        <CheckBadgeIcon className="w-4 h-4 mr-2 bg-green" />
        <span>Contract source code verified</span>
      </div>
      <div className="mt-6">
        <CodeBlock
          label="Contract creation bytecode"
          content={creationCode}
          showCopy
        />
      </div>

      <div className="mt-6">
        <CodeBlock
          label="Contract ABI"
          content={JSON.stringify(abi)}
          showCopy
        />
      </div>
      <div className="mt-6">
        <CodeBlock
          label="Deployed Bytecode"
          content={deploymentCode}
          showCopy
        />
      </div>
    </div>
  );
};

export default AddressContractVerified;
