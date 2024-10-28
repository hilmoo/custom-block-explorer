import React, { useState } from "react";

import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";
import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";

const ListItem = ({ label, value, info = "", showCopy = false }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const onCopyClick = (event) => {
    setHasCopied(true);
    event.preventDefault();
    navigator.clipboard.writeText(value);
    setTimeout(() => setHasCopied(false), 1000);
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-2">
      {!!info ? (
        <Tooltip text={info}>
          <span className="cursor-pointer font-bold text-gray-600">
            {label}
          </span>
        </Tooltip>
      ) : (
        <div className="col-span-5 sm:col-span-1">
          <div className="">{label}:</div>
        </div>
      )}
      <div className="col-span-5 sm:col-span-4">
        <div className="flex items-center space-x-2">
          <div className="truncate">{value}</div>
          {showCopy && !hasCopied ? (
            <div className="cursor-pointer" onClick={onCopyClick}>
              <ClipboardDocumentIcon className="h-4 w-4" />
            </div>
          ) : null}

          {showCopy && hasCopied ? (
            <div className="cursor-pointer">
              <ClipboardDocumentCheckIcon className="h-4 w-4" color="green" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
