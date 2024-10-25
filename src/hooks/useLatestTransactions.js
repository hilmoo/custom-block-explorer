import { useState, useEffect } from "react";
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
        const blockNumber = await provider.getBlockNumber();

        let txs = [];
        let count = 0;
        while (txs.length < transactionCount) {
          const block = await provider.getBlockWithTransactions(
            blockNumber - count
          );
          count += 1;
          if (block.transactions.length > transactionCount + txs.length) {
            txs.push(
              ...block.transactions.slice(0, transactionCount - txs.length)
            );
          } else {
            txs.push(...block.transactions);
          }
        }

        setTransactions(txs);
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
