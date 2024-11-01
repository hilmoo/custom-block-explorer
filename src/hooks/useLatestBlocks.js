import { useState, useEffect } from "react";
import { getSocketProvider } from "../helpers"; // Modify helper to use WS provider

export const useLatestBlocks = (pageNumber = 1, blockCount = 10) => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBlocks, setTotalBlocks] = useState(0);

  useEffect(() => {
    const provider = getSocketProvider();

    const fetchInitialBlocks = async () => {
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

        const initialBlocks = await Promise.all(blockPromises);
        setBlocks(initialBlocks);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch initial blocks once
    fetchInitialBlocks();

    // Listen for new blocks using WebSocket
    provider.on("block", async (newBlockNumber) => {
      try {
        const newBlock = await provider.getBlockWithTransactions(
          newBlockNumber
        );
        setBlocks((prevBlocks) => [
          newBlock,
          ...prevBlocks.slice(0, Math.min(50, newBlockNumber)),
        ]);
        setTotalBlocks(newBlockNumber);
      } catch (err) {
        console.error("Error fetching new block:", err);
      }
    });

    // Cleanup WebSocket listener on unmount
    return () => {
      provider.removeAllListeners("block");
    };
  }, [pageNumber, blockCount]);

  return { blocks, loading, error, totalBlocks };
};
