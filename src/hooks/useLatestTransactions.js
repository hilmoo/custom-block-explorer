import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider } from "../helpers";

export const useLatestTransactions = (transactionCount = 10) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const provider = getProvider();

    const fetchLatestTransactions = async () => {
      try {
        setLoading(true);
        const latestBlock = await provider.getBlockWithTransactions("latest");
        const txData = latestBlock.transactions.slice(0, transactionCount); // Limit the transactions if needed
        setTransactions(txData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTransactions();
  }, [transactionCount]);

  return { transactions, loading, error };
};
