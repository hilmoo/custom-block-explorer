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
        const latestBlockNumber = await provider.getBlockNumber();

        let txs = [];
        let blockPromises = [];
        let count = 0;

        while (txs.length < transactionCount && count <= latestBlockNumber) {
          blockPromises.push(
            provider.getBlockWithTransactions(latestBlockNumber - count)
          );
          count++;
        }

        const blocks = await Promise.all(blockPromises);
        blocks.forEach((block) => {
          if (block.transactions.length + txs.length >= transactionCount) {
            txs.push(
              ...block.transactions.slice(0, transactionCount - txs.length)
            );
          } else {
            txs.push(...block.transactions);
          }
        });

        setTransactions(txs.slice(0, transactionCount)); // Limit to exact transactionCount
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
