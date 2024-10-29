import { useState, useEffect, useCallback, useRef } from "react";
import { getProvider } from "../helpers";
import { ethers } from "ethers";

const provider = getProvider();

export const useAddressTransactionDataV2 = (address) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [firstActiveBlock, setFirstActiveBlock] = useState(null);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [summary, setSummary] = useState({
    latestTransaction: null,
    firstTransaction: null,
    totalBalanceSent: ethers.BigNumber.from(0),
    totalBalanceReceived: ethers.BigNumber.from(0),
  });

  // Track transaction hashes to avoid duplicates using a ref to persist across renders
  const transactionHashes = useRef(new Set());

  // Step 1: Perform binary search to find the first active block of the address
  const findFirstActiveBlock = useCallback(async () => {
    let low = 0;
    let high = await provider.getBlockNumber();
    let firstActive = high;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const balance = await provider.getBalance(address, mid);
      const nonce = await provider.getTransactionCount(address, mid);

      if (balance.gt(0) || nonce > 0) {
        firstActive = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    setFirstActiveBlock(firstActive);
  }, [address]);

  // Step 2: Calculate the total transaction count
  const calculateTotalTransactions = useCallback(async () => {
    if (firstActiveBlock === null) return;

    try {
      const latestNonce = await provider.getTransactionCount(address);
      let incomingCount = 0;

      for (
        let blockNumber = await provider.getBlockNumber();
        blockNumber >= firstActiveBlock;
        blockNumber--
      ) {
        const block = await provider.getBlockWithTransactions(blockNumber);

        block.transactions.forEach((tx) => {
          if (tx.to && tx.to.toLowerCase() === address.toLowerCase()) {
            incomingCount++;
          }
        });
      }

      setTotalTransactions(latestNonce + incomingCount);
    } catch (error) {
      console.error("Error calculating total transactions:", error);
      setError("Failed to calculate total transactions");
    }
  }, [address, firstActiveBlock]);

  // Step 3: Fetch all transactions from the first active block onward
  const fetchTransactions = useCallback(async () => {
    if (firstActiveBlock === null) return;
    setLoading(true);
    setError(null);

    try {
      const latestBlock = await provider.getBlockNumber();

      const blockPromises = [];
      for (let i = firstActiveBlock; i <= latestBlock; i++) {
        blockPromises.push(provider.getBlockWithTransactions(i));
      }

      const blocks = await Promise.all(blockPromises);
      const newTransactions = [];
      let totalSent = ethers.BigNumber.from(0);
      let totalReceived = ethers.BigNumber.from(0);
      let latestTx = null;
      let firstTx = null;

      blocks.forEach((block) => {
        block.transactions.forEach((tx) => {
          const txHash = tx.hash.toLowerCase();
          if (
            (tx.from.toLowerCase() === address.toLowerCase() ||
              (tx.to && tx.to.toLowerCase() === address.toLowerCase())) &&
            !transactionHashes.current.has(txHash)
          ) {
            transactionHashes.current.add(txHash); // Track this transaction hash to avoid duplicates
            const transactionType =
              tx.from.toLowerCase() === address.toLowerCase()
                ? "OUTGOING"
                : "INCOMING";
            newTransactions.push({ ...tx, transactionType });

            // Calculate total sent and received balances
            if (transactionType === "OUTGOING") {
              totalSent = totalSent.add(tx.value);
            } else if (transactionType === "INCOMING") {
              totalReceived = totalReceived.add(tx.value);
            }

            // Update first and latest transactions based on block number
            if (!latestTx || tx.blockNumber > latestTx.blockNumber) {
              latestTx = tx;
            }
            if (!firstTx || tx.blockNumber < firstTx.blockNumber) {
              firstTx = tx;
            }
          }
        });
      });

      setTransactions((prev) => [...prev, ...newTransactions]);
      setSummary({
        latestTransaction: latestTx,
        firstTransaction: firstTx,
        totalBalanceSent: totalSent,
        totalBalanceReceived: totalReceived,
      });
    } catch (error) {
      setError("Failed to fetch transactions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [address, firstActiveBlock]);

  // Run binary search once, if not yet completed
  useEffect(() => {
    if (firstActiveBlock === null) {
      findFirstActiveBlock();
    }
  }, [findFirstActiveBlock, firstActiveBlock]);

  // Calculate total transactions after finding the first active block
  useEffect(() => {
    if (firstActiveBlock !== null) {
      calculateTotalTransactions();
    }
  }, [calculateTotalTransactions, firstActiveBlock]);

  // Fetch transactions after determining the first active block
  useEffect(() => {
    if (firstActiveBlock !== null) {
      fetchTransactions();
    }
  }, [fetchTransactions, firstActiveBlock]);

  return {
    transactions,
    loading,
    error,
    totalTransactions,
    latestTransaction: summary.latestTransaction,
    firstTransaction: summary.firstTransaction,
    totalBalanceSent: ethers.utils.formatEther(summary.totalBalanceSent),
    totalBalanceReceived: ethers.utils.formatEther(
      summary.totalBalanceReceived
    ),
  };
};
