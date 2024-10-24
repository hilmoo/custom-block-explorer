import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { getProvider } from "../helpers";

export const useLatestBlocks = (blockCount = 10) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const provider = getProvider();

    const fetchLatestBlocks = async () => {
      try {
        setLoading(true);
        const latestBlockNumber = await provider.getBlockNumber();
        const blockPromises = [];

        for (let i = 0; i < blockCount; i++) {
          blockPromises.push(
            provider.getBlockWithTransactions(latestBlockNumber - i)
          );
        }

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
