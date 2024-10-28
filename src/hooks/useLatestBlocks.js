import { useState, useEffect } from "react";
import { getProvider } from "../helpers";

export const useLatestBlocks = (blockCount = 10) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const provider = getProvider();
    if (!provider) {
      setError("Provider not available");
      setLoading(false);
      return;
    }

    const fetchLatestBlocks = async () => {
      try {
        setLoading(true);
        const latestBlockNumber = await provider.getBlockNumber();

        const totalBlockCount = Math.min(blockCount, latestBlockNumber + 1);
        const blockPromises = Array.from({ length: totalBlockCount }, (_, i) =>
          provider.getBlockWithTransactions(latestBlockNumber - i)
        );

        const blockData = await Promise.all(blockPromises);
        setBlocks(blockData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlocks();
  }, [blockCount]);

  return { blocks, loading, error };
};
