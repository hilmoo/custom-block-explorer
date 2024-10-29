import React from "react";
import { useParams } from "react-router-dom";

import Divider from "../components/UI/Divider";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import AddressOverview from "../containers/Address/AddressOverview";
import TransactionInfo from "../containers/Address/TransactionInfo";
import MoreInfo from "../containers/Address/MoreInfo";
import AddressSection from "../containers/Address/AddressSection";
import useAddressData from "../hooks/useAddressData";
import { useAddressTransactionDataV2 } from "../hooks";

const AddressPage = () => {
  const { address } = useParams();
  const { summary } = useAddressData(address);
  const {
    transactions,
    latestTransaction,
    firstTransaction,
    totalTransactions,
  } = useAddressTransactionDataV2(address);

  return (
    <div className="p-6">
      <div>
        <div className="flex flex-col">
          <div className="flex align-middle font-varela items-center content-center">
            <span className="col-span-16 font-bold text-lg">Address </span>
            <span className="col-span-16 mx-2 text-md">{address}</span>
            <DocumentDuplicateIcon className="w-3 h-3" />
          </div>

          <span className="text-gray">ENS: titanbuilder.eth </span>
        </div>

        <Divider />

        <div className="grid grid-cols-3 gap-4">
          <AddressOverview
            ethBalance={summary.balance}
            usdBalance={summary.usdValue}
          />
          <TransactionInfo
            ethBalance={summary.balance}
            usdBalance={summary.usdValue}
          />
          <MoreInfo
            totalTxs={totalTransactions || null}
            latestTx={latestTransaction || null}
            firstTx={firstTransaction || null}
          />
        </div>

        <div>
          {/* For Address */}
          <AddressSection transactions={transactions} />

          {/* For Contracts */}
          {/* <AddressContractSection /> */}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
