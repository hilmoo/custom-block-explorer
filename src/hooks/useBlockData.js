import { useState, useEffect, useCallback } from "react";
import { getGasPriceAndRewards, getProvider } from "../helpers";

const useBlockData = (blockNumber) => {
  const [block, setBlock] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch block data
  const fetchBlockData = useCallback(async () => {
    try {
      setLoading(true);
      const provider = getProvider();
      const block = await provider.getBlockWithTransactions(blockNumber);
      const rewardData = getGasPriceAndRewards(block);
      const latestBlockNumber = await provider.getBlockNumber();
      const confirmations = latestBlockNumber - block.number;

      setBlock({ ...block, ...rewardData, confirmations });
    } catch (err) {
      setError(err.message);
      console.error("Error fetching block data:", err);
    } finally {
      setLoading(false);
    }
  }, [blockNumber]);

  useEffect(() => {
    fetchBlockData();
  }, [blockNumber]);

  return {
    block,
    loading,
    error,
    refreshBlockData: fetchBlockData,
  };
};

export default useBlockData;
