import { ethers } from "ethers";

// Function to get an Ethers provider (MetaMask or any other wallet)
export const getProvider = () => {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );
  return provider;
};

// Function to create a new contract instance
export const getContract = (contractAddress, abi, signer) => {
  return new ethers.Contract(contractAddress, abi, signer);
};

export const getSocketProvider = () => {
  const provider = new ethers.providers.WebSocketProvider(
    "ws://localhost:8545"
  );
  return provider;
};
