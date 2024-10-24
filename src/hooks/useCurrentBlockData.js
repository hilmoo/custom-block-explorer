import { useState, useEffect, useCallback } from "react";
import { getProvider } from "../helpers";

const useCurrentBlockData = () => {
  const [blockNumber, setBlockNumber] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch block data
  const fetchBlockData = useCallback(async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      if (!provider) throw new Error("Provider not found");

      const blockNumber = await provider.getBlockNumber();
      setBlockNumber(blockNumber);

      const block = await provider.getBlockWithTransactions(blockNumber);
      setTransactions(block.transactions);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching block data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlockData();
  }, [fetchBlockData]);

  return {
    blockNumber,
    transactions,
    loading,
    error,
    refreshBlockData: fetchBlockData,
  };
};

export default useCurrentBlockData;
