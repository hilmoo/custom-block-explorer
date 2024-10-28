import { useState, useEffect } from "react";
import { getProvider } from "../helpers";

export const useLatestTransactions = (
  pageNumber = 1,
  transactionCount = 10
) => {
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
        const transactionsToSkip = (pageNumber - 1) * transactionCount;

        // Fetch blocks until enough transactions for the page are collected
        while (
          txs.length < transactionsToSkip + transactionCount &&
          count <= latestBlockNumber
        ) {
          blockPromises.push(
            provider.getBlockWithTransactions(latestBlockNumber - count)
          );
          count++;
        }

        const blocks = await Promise.all(blockPromises);

        blocks.forEach((block) => {
          if (txs.length >= transactionsToSkip + transactionCount) return;

          if (
            block.transactions.length + txs.length >
            transactionsToSkip + transactionCount
          ) {
            txs.push(
              ...block.transactions.slice(
                0,
                transactionsToSkip + transactionCount - txs.length
              )
            );
          } else {
            txs.push(...block.transactions);
          }
        });

        // Get only the transactions for the current page
        const pageTransactions = txs.slice(
          transactionsToSkip,
          transactionsToSkip + transactionCount
        );
        setTransactions(pageTransactions);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestTransactions();
  }, [pageNumber, transactionCount]);

  return { transactions, loading, error };
};
