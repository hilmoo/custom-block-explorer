import { useState, useEffect } from "react";
import { getSocketProvider } from "../helpers"; // Update helper to use WS provider

export const useLatestTransactions = (
  pageNumber = 1,
  transactionCount = 10
) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const provider = getSocketProvider();

    const fetchInitialTransactions = async () => {
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

    // Fetch initial transactions once
    fetchInitialTransactions();

    // Listen for new blocks using WebSocket
    provider.on("block", async (newBlockNumber) => {
      try {
        const newBlock = await provider.getBlockWithTransactions(
          newBlockNumber
        );

        // Update transactions with the new block's transactions
        setTransactions((prevTransactions) => {
          const updatedTransactions = [
            ...newBlock.transactions,
            ...prevTransactions,
          ];
          return updatedTransactions.slice(
            0,
            Math.min(50, updatedTransactions.length)
          );
        });
      } catch (err) {
        console.error("Error fetching new block transactions:", err);
      }
    });

    // Cleanup WebSocket listener on unmount
    return () => {
      provider.removeAllListeners("block");
    };
  }, [pageNumber, transactionCount]);

  return { transactions, loading, error };
};
