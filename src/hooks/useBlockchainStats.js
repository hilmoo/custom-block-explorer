import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { loadFromIndexedDB, saveToIndexedDB } from "../services/dbService";

const provider = new ethers.providers.WebSocketProvider("ws://localhost:8545"); // Hardhat WebSocket endpoint

export const useBlockchainStats = () => {
  const [blockHeight, setBlockHeight] = useState(0);
  const [avgGasPrice, setAvgGasPrice] = useState("0");
  const [cumulativeTxCount, setCumulativeTxCount] = useState(0);
  const [txn24hVolume, setTxn24hVolume] = useState(0);
  const [txnCost24hVolume, setTxnCost24hVolume] = useState(0);

  useEffect(() => {
    let totalGasPrice = ethers.BigNumber.from(0);
    let totalCostPrice = ethers.BigNumber.from(0);
    let blockCount = 0;
    let transactionData = [];
    let cumulativeTransactions = 0;

    // Load data from IndexedDB
    const loadData = async () => {
      const storedTxCount = await loadFromIndexedDB("cumulativeTxCount");
      const storedGasPrice = await loadFromIndexedDB("avgGasPrice");
      const storedBlockHeight = await loadFromIndexedDB("blockHeight");
      const storedTxn24hVolume = await loadFromIndexedDB("txn24hVolume");
      const storedTxnCost24hVolume = await loadFromIndexedDB(
        "setTxnCost24hVolume"
      );

      if (storedTxCount) setCumulativeTxCount(storedTxCount);
      if (storedGasPrice) setAvgGasPrice(storedGasPrice);
      if (storedBlockHeight) setBlockHeight(storedBlockHeight);
      if (storedTxn24hVolume) setTxn24hVolume(storedTxn24hVolume);
      if (storedTxnCost24hVolume) setTxn24hVolume(storedTxnCost24hVolume);
    };

    const fetchHistoricalBlocks = async () => {
      const latestBlockNumber = await provider.getBlockNumber();

      for (let i = 0; i < latestBlockNumber; i++) {
        const blockNumber = latestBlockNumber - i;
        const block = await provider.getBlockWithTransactions(blockNumber);

        cumulativeTransactions += block.transactions.length;

        block.transactions.forEach((tx) => {
          totalGasPrice = totalGasPrice.add(tx.gasPrice);
          totalCostPrice = totalCostPrice.add(tx.value);
        });
        blockCount++;

        transactionData.push({
          blockNumber,
          txCount: block.transactions.length,
          timestamp: Date.now(),
        });
      }

      const avgGas = totalGasPrice.div(blockCount);
      setBlockHeight(latestBlockNumber);
      setAvgGasPrice(ethers.utils.formatUnits(avgGas, "gwei"));
      setCumulativeTxCount(cumulativeTransactions);
      setTxn24hVolume(transactionData.reduce((sum, tx) => sum + tx.txCount, 0));
      setTxnCost24hVolume(ethers.utils.formatUnits(totalCostPrice));

      // Save initial data to IndexedDB
      await saveToIndexedDB("cumulativeTxCount", cumulativeTransactions);
      await saveToIndexedDB(
        "avgGasPrice",
        ethers.utils.formatUnits(avgGas, "gwei")
      );
      await saveToIndexedDB("blockHeight", latestBlockNumber);
      await saveToIndexedDB(
        "txn24hVolume",
        transactionData.reduce((sum, tx) => sum + tx.txCount, 0)
      );
      await saveToIndexedDB(
        "txnCost24hVolume",
        ethers.utils.formatUnits(totalCostPrice)
      );
    };

    const handleBlock = async (blockNumber) => {
      const block = await provider.getBlockWithTransactions(blockNumber);

      // Update cumulative transaction count
      cumulativeTransactions += block.transactions.length;
      setCumulativeTxCount(cumulativeTransactions);
      await saveToIndexedDB("cumulativeTxCount", cumulativeTransactions);

      // Update average gas price calculation
      block.transactions.forEach((tx) => {
        totalGasPrice = totalGasPrice.add(tx.gasPrice);
        totalCostPrice = totalCostPrice.add(tx.value);
      });
      blockCount++;
      const avgGas = totalGasPrice.div(blockCount);
      setAvgGasPrice(ethers.utils.formatUnits(avgGas, "gwei"));
      setTxnCost24hVolume(ethers.utils.formatUnits(avgGas, "gwei"));
      await saveToIndexedDB(
        "txnCost24hVolume",
        ethers.utils.formatUnits(totalCostPrice)
      );
      await saveToIndexedDB(
        "avgGasPrice",
        ethers.utils.formatUnits(avgGas, "gwei")
      );

      // Store recent transactions for 24-hour volume tracking
      transactionData.push({
        blockNumber,
        txCount: block.transactions.length,
        timestamp: Date.now(),
      });
      transactionData = transactionData.filter(
        (tx) => Date.now() - tx.timestamp < 24 * 60 * 60 * 1000
      ); // Keep only 24-hour transactions
      const txnVolume24h = transactionData.reduce(
        (sum, tx) => sum + tx.txCount,
        0
      );
      setTxn24hVolume(txnVolume24h);
      await saveToIndexedDB("txn24hVolume", txnVolume24h);

      // Update block height
      setBlockHeight(blockNumber);
      await saveToIndexedDB("blockHeight", blockNumber);
    };

    // Initialize data on component mount
    loadData().then(fetchHistoricalBlocks);

    // Start listening for new blocks
    provider.on("block", handleBlock);

    // Clean up on unmount
    return () => {
      provider.off("block", handleBlock);
    };
  }, []);

  return {
    blockHeight,
    avgGasPrice,
    cumulativeTxCount,
    txn24hVolume,
    txnCost24hVolume,
  };
};
