import {
  ClipboardDocumentIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useMemo, useState } from "react";

// @Todo: Replace with custom tailwind
import { Collapse } from "antd";
import { getReadFunctions } from "../../../utils/getReadAndWriteFunctions";
import useReadContractFunctions from "../../../hooks/useReadContractFunctions";
import useContractFunctions from "../../../hooks/useContractFunctions";

const ITEMS = [
  {
    key: "1",
    label: "This panel can only be collapsed by clicking text",
    extra: (
      <ClipboardDocumentIcon
        className="h-5 w-5"
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    ),
  },
  {
    key: "2",
    label: "This panel can only be collapsed by clicking text",
    extra: (
      <ClipboardDocumentIcon
        className="h-5 w-5"
        onClick={(event) => {
          // If you don't want click extra trigger collapse, you can prevent this:
          event.stopPropagation();
        }}
      />
    ),
  },
];

const AddressContractVerifiedReadFunction = ({ address, abi }) => {
  const [activeKey, setActiveKey] = useState(null);
  const { readFunctions } = useContractFunctions(address, abi);

  const getDetails = (idx, key) => {
    return `${key}-${idx} THESE ARE DETAILS`;
  };

  const onChange = (key) => {
    setActiveKey(key);
  };

  console.log({ readFunctions });
  return (
    <div class="flex flex-col">
      <div className="flex align-center">
        <DocumentIcon className="w-4 h-4 mr-2" />
        Supports reading the following contract function information
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {ITEMS.map((item, index) => {
          return (
            <Collapse
              accordion
              onChange={onChange}
              collapsible="header"
              defaultActiveKey={["1"]}
              expandIconPosition="end"
              items={[{ ...item, children: getDetails(index, activeKey) }]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AddressContractVerifiedReadFunction;
