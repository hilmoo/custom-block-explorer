import React, { useEffect, useState } from "react";
import {
  getBlock,
  getLatestBlockNumber,
  listenToNewBlocks,
} from "../services/Web3Service";
import SummaryCard from "../components/SummaryCard";
import Title from "../components/UI/Title";
import BlockListCard from "../components/BlockList";

const SUMMARY = [
  { key: "marketcap", label: "Market Cap" },
  { key: "marketcap", label: "Total txns" },
  { key: "marketcap", label: "Avg. Gas price" },
  { key: "marketcap", label: "ETH total staked" },
  { key: "marketcap", label: "24h txn volume" },
  { key: "marketcap", label: "Block height" },
];

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

    // // Listen for new blocks
    // listenToNewBlocks(async (blockNumber) => {
    //   const newBlock = await getBlock(blockNumber);
    //   setBlocks((prevBlocks) => [newBlock, ...prevBlocks.slice(0, 9)]);
    // });
  }, []);

  return (
    <div className="p-6">
      <div className="container mx-auto py-8">
        <Title> Summary </Title>
        <SummaryCard />
      </div>

      <div className="container mx-auto py-8">
        {/* <Title> BlockList </Title> */}
        <BlockListCard />
      </div>

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
