import React, { useEffect, useState } from "react";
import {
  getBlock,
  getLatestBlockNumber,
  listenToNewBlocks,
} from "../services/Web3Service";

const Home = () => {
  const [blockNumber, setBlockNumber] = useState(0);
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const latestBlockNumber = await getLatestBlockNumber();
      setBlockNumber(latestBlockNumber);

      // Fetch the last 10 blocks
      const blockPromises = [];
      for (let i = latestBlockNumber; i > latestBlockNumber - 10; i--) {
        blockPromises.push(getBlock(i));
      }
      const blocksData = await Promise.all(blockPromises);
      setBlocks(blocksData);
    }

    fetchData();

    // Listen for new blocks
    listenToNewBlocks(async (blockNumber) => {
      const newBlock = await getBlock(blockNumber);
      setBlocks((prevBlocks) => [newBlock, ...prevBlocks.slice(0, 9)]);
    });
  }, []);

  return (
    <div className="p-6">
      <h1>Latest Blocks</h1>
      <ul>
        {blocks.map((block) => (
          <li key={block.number}>
            Block {block.number} - {block.miner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
