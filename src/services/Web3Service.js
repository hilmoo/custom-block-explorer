import { ethers } from "ethers";

// Connect to Hardhat local network
export const provider = new ethers.providers.JsonRpcProvider(
  process.env.REACT_APP_WEB3_PROVIDER
);

export const getBlock = async (blockNumber) => {
  return await provider.getBlock(blockNumber);
};

export const getLatestBlockNumber = async () => {
  return await provider.getBlockNumber();
};

export const listenToNewBlocks = (callback) => {
  const provider = new ethers.providers.WebSocketProvider(
    "ws://localhost:8545"
  );
  provider.on("block", (blockNumber) => {
    callback(blockNumber);
  });
};
