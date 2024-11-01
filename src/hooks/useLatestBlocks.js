import { useState, useEffect } from "react";
import { getProvider } from "../helpers";

export const useLatestBlocks = (pageNumber = 1, blockCount = 10) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBlocks, setTotalBlocks] = useState(0);

  useEffect(() => {
    const provider = getProvider();

    const fetchBlocks = async () => {
      try {
        setLoading(true);
        const latestBlockNumber = await provider.getBlockNumber();
        setTotalBlocks(latestBlockNumber);
        const blockPromises = [];

        const startBlockNumber =
          latestBlockNumber - (pageNumber - 1) * blockCount;
        const endBlockNumber = Math.max(startBlockNumber - blockCount + 1, 0);

        for (let i = startBlockNumber; i >= endBlockNumber; i--) {
          blockPromises.push(provider.getBlockWithTransactions(i));
        }

        const blockData = await Promise.all(blockPromises);

        // setBlocks((prevBlocks) => [...prevBlocks, ...blockData]);
        setBlocks(blockData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlocks();
  }, [pageNumber, blockCount]);

  return { blocks, loading, error, totalBlocks };
};
