import { useState, useEffect, useCallback } from "react";
import { getMethodNameFromData, getProvider, getTxsFees } from "../helpers";

const useTransactionData = (txHash, confirmations = 1) => {
  const [transaction, setTransaction] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch transaction data
  const fetchTransactionData = useCallback(async () => {
    try {
      setLoading(true);
      const provider = getProvider();

      const tx = await provider.getTransaction(txHash);
      const txReceipt = await provider.getTransactionReceipt(txHash);

      if (txReceipt) {
        const block = await provider.getBlock(txReceipt.blockNumber);
        const rewardData = getTxsFees({
          gasLimit: txReceipt.cumulativeGasUsed,
          gasPrice: txReceipt.effectiveGasPrice,
        });

        const methodName = await getMethodNameFromData(
          tx.data,
          tx.to || tx.creates
        );

        setTransaction({
          ...tx,
          ...txReceipt,
          rewardData,
          block,
          methodName,
        });
      } else {
        setError("Transaction not found");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching tx data:", err);
    } finally {
      setLoading(false);
    }
  }, [txHash, confirmations]);

  useEffect(() => {
    fetchTransactionData();
  }, [txHash, fetchTransactionData]);

  return {
    transaction,
    loading,
    error,
    refreshTransactionData: fetchTransactionData,
  };
};

export default useTransactionData;
