import React from "react";
import AddresssTransactionSummary from "./AddressTransactionSummary";
import AddresssTransactionList from "./AddresssTransactionList";

const AddressTransactionTab = () => {
  return (
    <div>
      <AddresssTransactionSummary />
      <AddresssTransactionList />
    </div>
  );
};

export default AddressTransactionTab;
